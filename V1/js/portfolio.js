document.addEventListener('DOMContentLoaded', function() {
    // Category filtering functionality
    const filterButtons = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get selected category
            const selectedCategory = this.getAttribute('data-filter');

            // Show/hide projects based on category
            projectCards.forEach(project => {
                if (selectedCategory === 'all' || project.getAttribute('data-category') === selectedCategory) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}); 