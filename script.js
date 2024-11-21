document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('image-preview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block'; // Show the image preview
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none'; // Hide the image preview
    }
});

document.getElementById('remove-bg').addEventListener('click', async () => {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please upload an image first.');
        return;
    }

    const formData = new FormData();
    formData.append('image_file', file);

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': '7azW5EL19zFGmNQVJBh7mZYu', // Replace with your API key
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error removing background');
        }

        const blob = await response.blob();
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        document.getElementById('result').innerHTML = '';
        document.getElementById('result').appendChild(img);
    } catch (error) {
        console.error(error);
        alert('Failed to remove background: ' + error.message);
    }
});
