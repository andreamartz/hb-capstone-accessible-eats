function initMap() {
    // Map options
    const options = {
        zoom: 12,
        center: {lat: 42.3601, lng: -71.0589}
    }
    // New map
    const map = new google.maps.Map(document.getElementById("map"), options);

    // Array of markers
    const markers = [
      {
        coords: {lat: 42.4668, lng: -70.9495},
        iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        content: '<h1>Lynn MA</h1>'
      },
      {
        coords: {lat: 42.8584, lng: -70.9300},
        content: '<h1>Amesbury MA</h1>'
      },
      {
        coords: {lat: 42.7762, lng: -71.0773},
      }
    ]

    // Loop through markers
    for(let i = 0; i < markers.length; i++) {
      // Add marker
      addMarker(markers[i]);
    }

    // Add marker function
    function addMarker(props) {
      const marker = new google.maps.Marker({
          position: props.coords,
          map: map,
          // icon: props.iconImage
      });

      // Check for custom icon
      if (props.iconImage) {
        // Set icon image
        marker.setIcon(props.iconImage);
      }

      // Check content
      if (props.content) {
        const infoWindow = new google.maps.InfoWindow({
          content: props.content
        });

        marker.addListener('click', () => infoWindow.open(map, marker));
      }
    }
}