var sampleData = [
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
]

/*
    need formattedData = [
        {source: 1, target: X}
    ]

*/

// 1 create N x 1 array 'idList', list of ALL ids
// 2 sort list (idList)
// 3 create 'relationship array'.
// 4 for each item in idList, look up the id it is following, find it's relative position in (idList), push into relationship array
// 5 should have required data

var transformedData = {};
var formattedData = [];
var idList = [];
for (var i = 0, ii = sampleData.length; i < ii; i += 1) {
    idList.push(...sampleData[i]);
}
idList.sort();
// console.log(idList);

// remove duplicates
var cleanedList = idList.filter((a, b) => {
    return idList.indexOf(a) === b;
});

// convert sampleData to key-value pairs to preserve relationship
// also for lookup later
for (var i = 0, ii = sampleData.length; i < ii; i += 1) {
// console.log(sampleData[i]);
  transformedData[sampleData[i][0]] = sampleData[i][1];
}

// cross-reference ids in transformedData using idList
// push results into formattedData as { source: X, target: Y }
// data should also be sufficient for XY charts
let sources = [];
let targets = [];

for (var i = 0, ii = cleanedList.length; i < ii; i += 1) {
    var target = cleanedList[i];
    var targetFollowing = transformedData[target];
    var followingIndex = cleanedList.indexOf(targetFollowing);

    console.table([
        [target, targetFollowing, followingIndex]
    ]);

    formattedData.push(
        {
            source: i,
            target: (followingIndex === -1 ? null : followingIndex)
        }
    );
}

// console.log([sources, targets]);
console.log('formattedData: ', formattedData);

// now we have the data in usable format!
/*
 formattedData: array of objects containing key-value pairs formatted for source-target usage. To double-check values, reference the 'source' or 'target' value of cleanedList
 e.g.
    formattedData[22] === { source: 21, target: 39 }
    cleanedList[21] === 202003
    transformedData['202003'] === 5965332
    cleanedList.indexOf(5965332) === 39
*/