const menuItems = [
    { id: 1, name: 'Eletronicos', parent: null },
    { id: 2, name: 'Departamento', parent: null },
    { id: 3, name: 'Escritorio', parent: null },
    { id: 4, name: 'Computadores', parent: 1 },
    { id: 5, name: 'Celulares', parent: 1 },
    { id: 6, name: 'Eletrodomesticos', parent: 1 },
    { id: 7, name: 'Notebook', parent: 4 },
    { id: 8, name: 'PC', parent: 4 },
    { id: 9, name: 'Mac', parent: 4 },
    { id: 10, name: 'Mesa', parent: 3 },
    { id: 11, name: 'Roupas', parent: 2 },
    { id: 12, name: 'Camisas', parent: 11 },
    { id: 13, name: 'Acessorios', parent: 2 },
    { id: 14, name: 'Blusas', parent: 11 },
    { id: 15, name: 'Com manga', parent: 14 },
];

class Menu {
    menuItems;

    constructor(menuItems) {
        this.menuItems = menuItems;
    }

    buildMenu() {
        if (this.duplicatedIds()) {
            throw 'Duplicated Ids';
        }
    
        // Root list
        const ul = document.createElement('ul');
    
        // Root elements
        const rootNodes = this.menuItems.filter(n => n.parent == null);
    
        for (let node of rootNodes) {
            let nodeLi = document.createElement('li');
            nodeLi.innerHTML = `<a>${node.name}</a>`;

            ul.appendChild(nodeLi);
            this.buildBranches(node, nodeLi);
        }
        
        // Add list to body so it can be renderized
        document.body.appendChild(ul);
    }
    
    buildBranches(node, nodeLi, closed = true) {
        // branches
        const branches = this.menuItems.filter(n => n.parent == node.id);
    
        if (branches.length > 0) {
            // has branches, add css class
            nodeLi.classList.add('item-parent');

            // Add function to hide child nodes on mouse click
            nodeLi.onclick = (event) => { 
                event.stopPropagation();
                this.toggleVisiblityChildNodes(nodeLi) 
            }
            
            // Branches ul
            const ul = document.createElement('ul');

            // Creation parameter
            ul.style.display = closed ? 'none' : 'block';
        
            for (let galho of branches) {
                let li = document.createElement('li');
                li.innerHTML = `<a>${galho.name}</a>`;
                li.onclick = (event) => {
                    event.stopPropagation();
                }

                ul.appendChild(li);
    
                // Add branch
                nodeLi.appendChild(ul)
        
                this.buildBranches(galho, li);
            }
        }
    }
    
    duplicatedIds() {
        for (let menuItem of this.menuItems) {
            const sameIdNodes = this.menuItems.filter(n => n.id == menuItem.id);
            const nodeWithSameIdExists = sameIdNodes.length > 1;
    
            if (nodeWithSameIdExists) {
                return true;
            }
        }
    
        return false;
    }

    toggleVisiblityChildNodes(nodeLi) {
        const internUl = nodeLi.childNodes[1];
        internUl.style.display = internUl.style.display == 'none' ? 'block' : 'none';
        nodeLi.classList.toggle('item-parent--open');
    }
}


menu = new Menu(menuItems);
menu.buildMenu();
