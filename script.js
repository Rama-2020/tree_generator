document.addEventListener('DOMContentLoaded', () => {
    const treeRoot = document.getElementById('treeRoot');

    treeRoot.addEventListener('click', function(event) {
        if (event.target.classList.contains('add')) {
            addNode(event.target);
        } else if (event.target.classList.contains('remove')) {
            removeNode(event.target);
        }
    });

    function addNode(button) {
        const parentNode = button.closest('.node');
        const childrenContainer = parentNode.querySelector('.children');

        const newNode = document.createElement('div');
        newNode.classList.add('node');
        newNode.innerHTML = `
            <span class="node-content">Child</span>
            <button class="add">+</button>
            <button class="remove">-</button>
            <div class="children"></div>
        `;

        childrenContainer.appendChild(newNode);
    }

    function removeNode(button) {
        const node = button.closest('.node');
        if (node.parentElement.classList.contains('children')) {
            node.parentElement.removeChild(node);
        }
    }
});
