// from store.sample()
var follows = [
	[15725906, 44771048],
	[179339999, 688483],
	[15903746, 5807992],
	[24830940, 2565],
	[14236481, 1000591],
	[5510372, 14236481],
	[19076596, 16303106],
	[22035736, 1374411],
	[963121, 4488],
	[1000591, 15903746],
	[24830940, 14685759],
	[2529971, 7015112],
	[2210521, 1374411],
	[1000591, 7865552],
	[14740219, 2695901],
	[9670742, 202003],
	[1389501, 7015112],
	[13027572, 1389501],
	[179339999, 5965332],
	[14236481, 5510372],
	[1374411, 6475722],
	[9670742, 5803082],
	[23107116, 14236481],
	[205754331, 1000591],
	[139918711, 18785654],
	[6368102, 1000591],
	[9670742, 295],
	[12798452, 16303106],
	[2695901, 1000591],
	[963121, 5965332],
	[202003, 295],
	[1807861, 15903746],
	[1807861, 295],
	[14740219, 3713811],
	[5965332, 20609518],
	[9670742, 169686021],
	[1807861, 295],
	[963121, 753963],
	[688483, 14236481],
	[14685759, 3713811],
	[3713811, 20609518],
	[295, 15870311],
	[15903746, 2529971],
	[14685759, 5807992],
	[5965332, 179339999],
	[12468982, 4488],
	[18802096, 15859039],
	[202003, 5965332],
	[3382, 179339999],
	[3713811, 1000591]
];

// sort the list?
// build the data set:

follows.map((a) => {
	// build dataset step 1: setup structure for ids
	// and populate 'following' list
	if (dataset[a[0]]) {
		console.log(dataset[a[0]], dataset[a[1]]);
		if (dataset[a[0]].following.indexOf(a[1]) < 0) {
			dataset[a[0]].following.push(a[1]);
		}
	} else {
		dataset[a[0]] = {
			following: [a[1]],
			followers: [],
			tags: []
		};
	}

	// build dataset step 2: populate 'followers' list
	if (dataset[a[1]]) {
		if (dataset[a[1]].followers.indexOf(a[0]) < 0) {
			dataset[a[1]].followers.push(a[0]);
		}
	} else {
		dataset[a[1]] = {
			following: [],
			followers: [a[0]],
			tags: []
		};
	}

	// TODO: step 3: populate tags for each key

	// TODO: step 4: create a separate array for tags
	// represent as horizontal bar plot? or bubble chart?
	// https://www.d3-graph-gallery.com/graph/barplot_horizontal.html
	// it should do the job well: clearly show tag aggregation
	// need to parse data into this format
	/*
	[
		{ id: 'some string', value: 'Int as string' },
		{ id: 'some string', value: 'Int as string' },
		{ id: 'some string', value: 'Int as string' }
	]
	*/

});

