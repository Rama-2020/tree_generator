document.addEventListener('DOMContentLoaded', () => {
    const treeContainer = document.getElementById('treeContainer');

    let treeData = {
        id: 'root',
        text: 'Root',
        children: []
    };

    function renderTree(node, parentElement) {
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.innerHTML = `
            <input type="text" class="node-content" value="${node.text}" data-id="${node.id}">
            <button class="add" data-id="${node.id}">+</button>
            <button class="remove" data-id="${node.id}">-</button>
            <div class="children"></div>
        `;

        const childrenContainer = nodeElement.querySelector('.children');

        node.children.forEach(child => {
            renderTree(child, childrenContainer);
        });

        parentElement.appendChild(nodeElement);

        if (node.children.length > 1) {
            const horizontalLine = document.createElement('div');
            horizontalLine.classList.add('horizontal-line');
            childrenContainer.appendChild(horizontalLine);
        }

        if (parentElement !== treeContainer) {
            const verticalLine = document.createElement('div');
            verticalLine.classList.add('line');
            parentElement.appendChild(verticalLine);
        }
    }

    function updateTreeText(nodeId, newText) {
        function updateNode(node) {
            if (node.id === nodeId) {
                node.text = newText;
            } else {
                node.children.forEach(updateNode);
            }
        }
        updateNode(treeData);
    }

    function addNode(parentId) {
        function findNodeAndAddChild(node) {
            if (node.id === parentId) {
                const newNode = {
                    id: generateId(),
                    text: 'Child',
                    children: []
                };
                node.children.push(newNode);
            } else {
                node.children.forEach(findNodeAndAddChild);
            }
        }
        findNodeAndAddChild(treeData);
        render();
    }

    function removeNode(nodeId) {
        function findNodeAndRemoveChild(node, parent) {
            if (node.id === nodeId) {
                const index = parent.children.indexOf(node);
                parent.children.splice(index, 1);
            } else {
                node.children.forEach(child => findNodeAndRemoveChild(child, node));
            }
        }
        findNodeAndRemoveChild(treeData, { children: [treeData] });
        render();
    }

    function generateId() {
        return 'node-' + Math.random().toString(36).substr(2, 9);
    }

    function render() {
        treeContainer.innerHTML = '';
        renderTree(treeData, treeContainer);
    }

    treeContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add')) {
            addNode(event.target.dataset.id);
        } else if (event.target.classList.contains('remove')) {
            removeNode(event.target.dataset.id);
        }
    });

    treeContainer.addEventListener('input', (event) => {
        if (event.target.classList.contains('node-content')) {
            updateTreeText(event.target.dataset.id, event.target.value);
        }
    });

    render();
});
