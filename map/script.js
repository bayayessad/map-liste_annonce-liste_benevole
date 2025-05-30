document.addEventListener('DOMContentLoaded', function() {
    // Get all region elements
    const regions = document.querySelectorAll('.region');
    
    // Create Bootstrap modal instance
    const regionModal = new bootstrap.Modal(document.getElementById('regionModal'));
    
    // Add click event listeners to each region
    regions.forEach(region => {
        region.addEventListener('click', function() {
            // Remove active class from all regions
            regions.forEach(r => r.classList.remove('active'));
            
            // Add active class to clicked region
            this.classList.add('active');
            
            // Get region name from data attribute
            const regionName = this.getAttribute('data-region');
            
            // Update modal title
            document.getElementById('regionModalLabel').textContent = regionName;
            
            // Show modal
            regionModal.show();
            
            // In a real application, you would fetch data for this region
            fetchRegionData(regionName);
        });
    });
    
    // Function to fetch region data (placeholder)
    function fetchRegionData(regionName) {
        console.log(`Fetching data for region: ${regionName}`);
        // This would be an API call in a real application
    }
    
    // Make the map responsive
    function resizeMap() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            const width = mapContainer.offsetWidth;
            const map = document.getElementById('bejaia-map');
            if (map) {
                // Adjust viewBox if needed based on width
                if (width < 500) {
                    map.setAttribute('viewBox', '100 100 600 400');
                } else {
                    map.setAttribute('viewBox', '0 0 800 600');
                }
            }
        }
    }
    
    // Initial call and event listener for resize
    resizeMap();
    window.addEventListener('resize', resizeMap);
});