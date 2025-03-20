<template>
    <DiagramToolbar
        :newElement="newElement"
        @create-entity="createEntity"
        @create-relationship="createRelationship"
        @create-label="createLabel"
        @open-download-dialog="openDownloadDialog"
        @export-file="exportFile"
    ></DiagramToolbar>
    <div class="page-body">
        <ElementDetails :element="activeElement" :elements="elements"></ElementDetails>
        <DiagramCanvas
            :addingElement="addingElement"
            :elements="elements"
            :connections="connections"
            :attributeSchemas="attributeSchemas"
            @activate-element="activateElement"
            @deactivate-element="deactivateElement"
            @new-element-added="createElement"
            ref="diagramCanvasRef"
        ></DiagramCanvas>
    </div>
    <DownloadDialog :canvasImage="canvasImage" ref="downloadDialogRef"></DownloadDialog>
</template>

<script>
import DiagramToolbar from "../components/DiagramToolbar.vue";
import ElementDetails from "../components/ElementDetails.vue";
import DiagramCanvas from "../components/DiagramCanvas.vue";
import DownloadDialog from "../components/DownloadDialog.vue";

import { RegularEntity } from "@/erDiagram/models/entities/RegularEntity";
import { DegenerativeEntity } from "@/erDiagram/models/entities/DegenerativeEntity";
import { Connection } from "@/erDiagram/models/Connection";
import { RelationshipConnection } from "@/erDiagram/models/connections/RelationshipConnection";
import { Relationship } from "@/erDiagram/models/Relationship";
import { Attribute } from "@/erDiagram/models/Attribute";
import { Entity } from "@/erDiagram/models/Entity";
import { SuperTypeEntity } from "@/erDiagram/models/entities/SuperTypeEntity";
import { Label } from "@/erDiagram/models/Label";
import { AttributeSchema } from "@/erDiagram/models/AttributeSchema";

import { changeEntityType } from "../utils/changeType";
import { useCanvasStore } from "../stores/index";
import { mapState } from "pinia";

export default {
    name: "DiagramView",
    components: { DiagramToolbar, ElementDetails, DiagramCanvas, DownloadDialog },
    data() {
        return {
            elementWidth: 110,
            elementHeight: 55,
            elements: [],
            connections: [],
            attributeSchemas: [],
            activeElement: null,
            canvasImage: null,

            newElement: null,
            addingElement: false,
        };
    },
    created() {
        this.$eventBus.on("set-relationship-entity", (change) => this.setNewEntity(change));
        this.$eventBus.on("remove-all-attributes", () => this.removeAllAttributes());
        this.$eventBus.on("change-entity-type", (type) => this.changeEntityType(type));
        this.$eventBus.on("add-entity", () => this.addEntity());
        this.$eventBus.on("create-attribute-schema", () => this.createAttributeSchema());
        this.$eventBus.on("remove-attribute-schema", () => this.removeAttributeSchema());
        this.$eventBus.on("delete-element", () => this.deleteElement());
        this.$eventBus.on("add-attribute", () => this.addAttribute());
        this.$eventBus.on("download-image", (transparentBack) => this.downloadImage(transparentBack));
    },
    computed: {
        ...mapState(useCanvasStore, ["getContext", "getCanvasWidth", "getCanvasHeight"]),
    },
    methods: {
        createElement(event) {
            this.newElement.shape.x = event.offsetX - this.elementWidth / 2;
            this.newElement.shape.y = event.offsetY - this.elementHeight / 2;
            this.elements.push(this.newElement);
            this.activateElement(this.newElement);
            this.newElement = null;
            this.addingElement = false;
        },
        createEntity() {
            this.newElement = new RegularEntity(
                "Entity",
                this.getContext,
                0,
                0,
                this.elementWidth,
                this.elementHeight,
                false,
                { x: 0, y: 0 },
                [],
                null,
                null,
            );
            this.addingElement = true;
        },
        createRelationship() {
            const endpoints = {
                topTaken: false,
                rightTaken: false,
                bottomTaken: false,
                leftTaken: false,
            };

            this.newElement = new Relationship(
                "Relationship",
                this.getContext,
                0,
                0,
                this.elementWidth,
                this.elementHeight,
                false,
                { x: 0, y: 0 },
                endpoints,
            );
            this.addingElement = true;
        },
        createLabel() {
            this.newElement = new Label(
                "Label",
                this.getContext,
                0,
                0,
                this.elementWidth,
                this.elementHeight,
                false,
                { x: 0, y: 0 },
                "",
            );
            this.addingElement = true;
        },
        addAttribute() {
            let attribute = this.activeElement.addAttribute(
                "Attribute",
                this.elementWidth,
                this.elementHeight,
                this.getCanvasWidth,
                this.getCanvasHeight,
            );
            this.elements.push(attribute);
            let connection = new Connection(this.getContext, this.activeElement, attribute);
            this.connections.push(connection);
            this.activateElement(attribute);
        },
        addEntity() {
            let { element, connection } = this.activeElement.addEntity(
                "Sub-Entity",
                this.elementWidth,
                this.elementHeight,
                this.getCanvasWidth,
                this.getCanvasHeight,
            );
            this.elements.push(element);
            this.connections.push(connection);
            this.activateElement(element);
        },
        createAttributeSchema() {
            // hide all entity's attributes
            const attributes = this.activeElement.getAllElementsRecursive(false, true);
            attributes.forEach((attribute) => (attribute.willDraw = false));

            // hide all connections that connect those attributes
            const connections = this.connections.filter(
                (connection) => attributes.includes(connection.element1) || attributes.includes(connection.element2),
            );
            connections.forEach((connection) => (connection.willDraw = false));

            const attributeSchema = new AttributeSchema(
                "Attribute Schema",
                this.getContext,
                this.activeElement.shape.x,
                this.activeElement.shape.y + this.activeElement.shape.height * 2,
                this.elementWidth,
                this.elementHeight,
                false,
                { x: 0, y: 0 },
                this.activeElement,
            );

            this.attributeSchemas.push(attributeSchema);
            this.activeElement.attributeSchema = attributeSchema;
        },
        removeAttributeSchema() {
            // show all entity's attributes
            const attributes = this.activeElement.getAllElementsRecursive(false, true);
            attributes.forEach((attribute) => (attribute.willDraw = true));

            // show all connections that connect those attributes
            const connections = this.connections.filter(
                (connection) => attributes.includes(connection.element1) || attributes.includes(connection.element2),
            );
            connections.forEach((connection) => (connection.willDraw = true));

            // remove that attribute schema from list of attribute schemas
            this.attributeSchemas = this.attributeSchemas.filter(
                (attributeSchema) => attributeSchema.entity.id != this.activeElement.id,
            );

            // remove that attribute schema from currently active entity
            this.activeElement.attributeSchema = null;
        },
        setNewEntity(change) {
            // set new entity to relationship
            let connection;
            let { newEntity, oldEntity, entityText } = change;

            // if user chose 'None' as new entity
            if (!newEntity) {
                // filter out only one connection from targetConnections because there can be one or two (reflexive relationship)
                this.connections = this.connections.filter(
                    (connection) =>
                        !(
                            connection.element1.id === this.activeElement.id &&
                            connection.element2.id === oldEntity.id &&
                            connection.entityText === entityText
                        ),
                );
                this.activeElement.resetEntity(entityText, true);
                this.$refs.diagramCanvasRef.redrawCanvas();
                return;
            }

            if (!oldEntity) {
                connection = new RelationshipConnection(this.getContext, this.activeElement, newEntity, entityText);
                this.connections.push(connection);
            } else {
                connection = this.connections.filter(
                    (connection) =>
                        connection.element1.id === this.activeElement.id &&
                        connection.element2.id === oldEntity.id &&
                        connection.entityText === entityText,
                )[0];
                connection.updateConnection(this.activeElement, newEntity);
                this.activeElement.resetEntity(entityText, false);
            }

            const reflexiveEntity = this.activeElement.isReflexive();
            if (reflexiveEntity) {
                // if relationship is reflexive, remove other connected entity that is connected only once
                Object.values(this.activeElement.entities).forEach((entity) => {
                    if (entity.entity && entity.entity.id !== reflexiveEntity.entity.id) {
                        // remove that entity's connection
                        this.connections = this.connections.filter(
                            (connection) =>
                                !(
                                    connection.element1.id === this.activeElement.id &&
                                    connection.element2.id === entity.entity.id
                                ),
                        );

                        // reset relationship's entity props
                        this.activeElement.resetEntity(entity.text, true);
                    }
                });
            }

            this.$refs.diagramCanvasRef.redrawCanvas();
        },
        deleteElement() {
            if (
                this.activeElement instanceof Attribute ||
                this.activeElement instanceof RegularEntity ||
                this.activeElement instanceof SuperTypeEntity
            ) {
                this.activeElement.removeFromParent();
            }

            // remove element's attribute schema from list of attribute schemas (if it exists)
            this.attributeSchemas = this.attributeSchemas.filter(
                (attributeSchema) => attributeSchema.entity.id != this.activeElement.id,
            );

            let elementsForDeletion = this.activeElement.getAllElementsRecursive(true, true); // includeMyself = true, includeMyAttributes = true
            this.removeAllElementsAndConnections(elementsForDeletion);
            this.activeElement = null;
        },
        removeAllAttributes() {
            let elementsForDeletion = this.activeElement.getAllElementsRecursive(false, true); // includeMyself = false, includeMyAttributes = true
            this.removeAllElementsAndConnections(elementsForDeletion);
        },
        removeAllElementsAndConnections(elementsForDeletion) {
            this.elements = this.elements.filter((element) => !elementsForDeletion.includes(element)); // remove all elements marked for deletion

            // remove all connections that connect elements that are marked for deletion
            this.connections = this.connections.filter(
                (connection) =>
                    !elementsForDeletion.includes(connection.element1) &&
                    !elementsForDeletion.includes(connection.element2),
            );
        },
        activateElement(element) {
            // deactivate currently active element
            this.deactivateElement();

            element.active = true;
            this.activeElement = element instanceof AttributeSchema ? element.entity : element;
        },
        deactivateElement() {
            if (!this.activeElement) return; // if there is no active element

            this.activeElement.active = false;
            if (
                (this.activeElement instanceof Entity || this.activeElement instanceof Relationship) &&
                this.activeElement.attributeSchema
            ) {
                this.activeElement.attributeSchema.active = false;
            }

            this.activeElement = null;
        },
        changeEntityType(type) {
            if (this.activeElement instanceof SuperTypeEntity) {
                let elementsForDeletion = this.activeElement.getAllElementsRecursive(false, false); // includeMyself = false, includeMyAttributes = false
                this.removeAllElementsAndConnections(elementsForDeletion);
            }

            this.removeAttributeSchema();

            let element = changeEntityType(this.activeElement, type);

            const relationships = this.elements.filter((element) => element instanceof Relationship);

            relationships.forEach((relationship) => {
                Object.values(relationship.entities).forEach((entity) => {
                    if (entity.entity === this.activeElement) {
                        entity.entity = element;
                        this.setNewEntity({
                            relationship: relationship,
                            newEntity: element,
                            oldEntity: this.activeElement,
                        });
                    }
                });
            });

            // update every connection that was using old element and give it new element instead
            this.connections.forEach((connection) => {
                if (connection.element1 === this.activeElement)
                    connection.updateConnection(element, connection.element2);
                else if (connection.element2 === this.activeElement)
                    connection.updateConnection(connection.element1, element);
            });

            if (element instanceof DegenerativeEntity) {
                // delete all attributes of current activeElement
                this.elements = this.elements.filter((e) => !this.activeElement.attributes.includes(e));

                // delete all connections of new element that are not connecting it to relationships
                this.connections = this.connections.filter(
                    (connection) =>
                        connection.element1 instanceof Relationship ||
                        (connection.element1.id !== element.id && connection.element2.id !== element.id),
                );
            }

            this.elements = this.elements.filter((element) => element.id != this.activeElement.id); // remove old element from list of elements
            this.elements.push(element); // add new element to the list of elements

            this.activateElement(element);
        },
        openDownloadDialog() {
            this.deactivateElement();

            const canvasVue = this.$refs.diagramCanvasRef;
            canvasVue.redrawCanvas();

            const canvasHtml = canvasVue.$refs.canvasRef;
            this.canvasImage = canvasHtml.toDataURL("image/png");

            this.$refs.downloadDialogRef.$refs.dialogRef.showModal();
        },
        downloadImage(transparentBack) {
            if (!transparentBack) this.$refs.diagramCanvasRef.redrawWithWhiteBack();

            const canvasHtml = this.$refs.diagramCanvasRef.$refs.canvasRef;

            const imageData = canvasHtml.toDataURL("image/png"); // Get image data from canvas
            const downloadLink = document.createElement("a"); // Create a link for downloading

            downloadLink.href = imageData; // Set href to the image data URL
            downloadLink.download = "ER_diagram.png"; // Set the download filename
            downloadLink.click(); // Simulate a click to download

            this.$refs.downloadDialogRef.closeDialog();
        },
        exportFile() {
            const diagramData = {
                elements: this.elements,
                connections: this.connections,
                attributeSchemas: this.attributeSchemas,
            };

            const jsonString = JSON.stringify(diagramData, null, 2);
            const blob = new Blob([jsonString], { type: "application/json" });
            const link = document.createElement("a");

            link.href = URL.createObjectURL(blob);
            link.download = "er_diagram.json";
            link.click();
        },
    },
};
</script>

<style scoped lang="scss">
.page-body {
    width: 100vw;
    height: 86vh;
    display: flex;
}
</style>
