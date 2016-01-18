jQuery(document).ready(function($) {
	function initialize() {
		var api_url = "https://script.google.com/macros/s/AKfycbwy6WFg_iyQFNWgcsS8G5u6AbPcm870eK_PPTYmJprENct7Mye4/exec"

		$.get(api_url, "get", function(json){
			var input = json.output;
			var markers =[];
			var map = new google.maps.Map(
				document.getElementById('map-canvas'),{
					center: { lat: 24.121468, lng: 120.675867},
					zoom: 17,
					disableDefaultUI: true,
			});
			var icon = ['http://flat-icon-design.com/f/f_traffic_45/s32_f_traffic_45_0nbg.png',
						'http://flat-icon-design.com/f/f_traffic_45/s32_f_traffic_45_1nbg.png',
						'http://flat-icon-design.com/f/f_traffic_45/s32_f_traffic_45_2nbg.png'];
			var talk_details = [];
			var last_marker;
			input.forEach(function(input_data, i){
				markers.push(new google.maps.Marker({
					position: {lat: input_data.lat, lng: input_data.lng},
					map: map,
					icon: icon[input_data.type],
					animation: google.maps.Animation.DROP,
				}));
				talk_details.push({
					topics: input_data.topics,
					speaker: input_data.speaker,
					time: input_data.time,
					location: input_data.location,
					detail: input_data.detail,
					video_text: input_data.video_text,
					video_id: input_data.video_id,
				});
			});
			markers.forEach(function(marker, i){
				marker.addListener('click', function() {
					detail_show(i);
					if (marker.getAnimation() === null) {
						marker.setAnimation(google.maps.Animation.BOUNCE);
						if (last_marker !== undefined)
							markers[last_marker].setAnimation(null);
						last_marker = i;
					}
				});
			});
			function detail_show(i){
				$('#talk_topics').text(talk_details[i].topics);
				$('#talk_speaker').text(talk_details[i].speaker);
				$('#talk_time').text(talk_details[i].time);
				$('#talk_location').text(talk_details[i].location);
				$('#talk_detail').text(talk_details[i].detail);
				$('#talk_video_text').text(talk_details[i].video_text);
				$('#talk_video').attr('src', 'https://www.youtube.com/embed/' + talk_details[i].video_id + '?rel=0');
			}
			detail_show(0);
		});
	};
	google.maps.event.addDomListener(window, 'load', initialize);
	$('#load_img').fadeOut(1000);
});
