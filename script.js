<script>
    const clientId = 'e1118d05d2f74380b13083dc72908f0d';
    const clientSecret = '9ae608e72061470babe549f8c57715fd';
    const redirectUri = 'YOUR_REDIRECT_URI';
    
    // Spotify API endpoints
    const authUrl = 'https://accounts.spotify.com/authorize';
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const apiBaseUrl = 'https://api.spotify.com/v1';

    // Spotify API scopes
    const scopes = ['user-modify-playback-state'];

    // Function to authorize with Spotify
    function authorizeWithSpotify() {
        const params = {
            client_id: clientId,
            response_type: 'token',
            redirect_uri: redirectUri,
            scope: scopes.join(' ')
        };

        // Redirect the user to Spotify's authorization page
        window.location.href = `${authUrl}?${new URLSearchParams(params)}`;
    }

    // Function to control playback
    function controlPlayback(action) {
        const token = localStorage.getItem('spotifyToken');
        if (!token) {
            authorizeWithSpotify();
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch(`${apiBaseUrl}/me/player/${action}`, {
            method: 'PUT',
            headers: headers
        })
        .then(response => {
            if (response.status === 204) {
                console.log(`${action} successful`);
            } else {
                console.error(`${action} failed`);
            }
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        });
    }

    // Event listeners for control buttons
    document.getElementById('play').addEventListener('click', () => controlPlayback('play'));
    document.getElementById('pause').addEventListener('click', () => controlPlayback('pause'));
    document.getElementById('next').addEventListener('click', () => controlPlayback('next'));
    document.getElementById('prev').addEventListener('click', () => controlPlayback('previous'));
</script>
