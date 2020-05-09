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
        if (this.idsDuplicados()) {
            throw 'Ids duplicados;'
        }
    
        // lista
        const ul = document.createElement('ul');
    
        // elementos raizes
        const raiz = this.menuItems.filter(n => n.parent == null);
    
        for (let node of raiz) {
            let li = document.createElement('li');
            li.innerHTML = node.name;
            ul.appendChild(li);
            this.montaGalhos(node, li);
        }
    
        // adiciona lista ao body
        document.body.appendChild(ul);
    }
    
    montaGalhos(node, nodeLi) {
        // menu: lista, node: nodulo  do pai; nodeLi: li do nodulo pai
    
        // filhos
        const galhos = this.menuItems.filter(n => n.parent == node.id);
    
        if (galhos) {
            // ul dos galhos
            const ul = document.createElement('ul');
        
            for (let galho of galhos) {
                let li = document.createElement('li');
                li.innerHTML = galho.name;
                ul.appendChild(li);
    
                // insere galho
                nodeLi.appendChild(ul)
        
                this.montaGalhos(galho, li);
            }
        }
    }
    
    idsDuplicados() {
        for (let menuItem of this.menuItems) {
            let repeticao = this.menuItems.filter(n => n.id == menuItem.id);
    
            if (repeticao.length > 1) {
                return true;
            }
        }
    
        return false;
    }
}


menu = new Menu(menuItems);
menu.buildMenu();

// let f = function(menu) {
//     if (idsDuplicados(menu)) {
//         throw 'Ids duplicados;'
//     }

//     // lista
//     const ul = document.createElement('ul');

//     // elementos raizes
//     const raiz = menu.filter(n => n.parent == null);

//     for (let node of raiz) {
//         let li = document.createElement('li');
//         li.innerHTML = node.name;
//         ul.appendChild(li);
//         montaGalhos(menu, node, li);
//     }

//     // adiciona lista ao body
//     document.body.appendChild(ul);
// }

// let montaGalhos = function(menu, node, nodeLi) {
//     // menu: lista, node: nodulo  do pai; nodeLi: li do nodulo pai

//     // filhos
//     const galhos = menu.filter(n => n.parent == node.id);

//     if (galhos) {
//         // ul dos galhos
//         const ul = document.createElement('ul');
    
//         for (let galho of galhos) {
//             let li = document.createElement('li');
//             li.innerHTML = galho.name;
//             ul.appendChild(li);

//             // insere galho
//             nodeLi.appendChild(ul)
    
//             montaGalhos(menu, galho, li);
//         }
//     }
// }

// let idsDuplicados = function(menu) {
//     for (let menuItem of menu) {
//         let repeticao = menu.filter(n => n.id == menuItem.id);

//         if (repeticao.length > 1) {
//             return true;
//         }
//     }

//     return false;
// }

// f(menu)
