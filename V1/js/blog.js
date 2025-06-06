document.addEventListener('DOMContentLoaded', function() {
    // Category filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    // Sort posts by date (newest first)
    sortPostsByDate();
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Show/hide posts based on category
            postCards.forEach(post => {
                if (selectedCategory === 'all' || post.getAttribute('data-category') === selectedCategory) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
    
    // Function to sort posts by date (newest first)
    function sortPostsByDate() {
        const postsContainer = document.querySelector('.posts-grid');
        const posts = Array.from(postCards);
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => {
            const dateA = new Date(a.querySelector('.date').textContent);
            const dateB = new Date(b.querySelector('.date').textContent);
            return dateB - dateA; // Descending order (newest first)
        });
        
        // Reorder posts in the DOM
        posts.forEach(post => {
            postsContainer.appendChild(post);
        });
    }
    
    // Remove pagination elements from the DOM
    const paginationElement = document.querySelector('.pagination');
    if (paginationElement) {
        paginationElement.remove();
    }
}); 