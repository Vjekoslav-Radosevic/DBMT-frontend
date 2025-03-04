export function changeEntityType(activeElement, type) {
    let entity;
    switch (type) {
        case "Regular":
            entity = activeElement.turnToRegularEntity();
            break;
        case "Degenerative":
            entity = activeElement.turnToDegenerativeEntity();
            break;
        case "Weak":
            entity = activeElement.turnToWeakEntity();
            break;
        case "Associative":
            entity = activeElement.turnToAssociativeEntity();
            break;
        case "SuperType":
            entity = activeElement.turnToSuperTypeEntity();
    }
    return entity;
}
