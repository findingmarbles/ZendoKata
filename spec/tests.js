/*
 * 20140814
 * "item" = individual part in a config, here defined by color, width & height
 * "config" = a configuration of items
 * "training set" = set of configurations known to be valid or invalid
 */

describe("Zendo", function() {
    var item1 = { color: 'red', width: 'S', height: '10' };
    var item2 = { color: 'blue', width: 'S', height: '20' };
    var item3 = { color: 'green', width: 'M', height: '30' };

    var conf1 = [
        item1
    ];
    var conf2 = [
        item1,
        { color: 'blue', width: 'M', height: '20' }
    ];
    var conf3 = [
        { color: 'blue', width: 'M', height: '10' },
        item1,
        item3
    ];
    var conf4 = [
        item2
    ];

    it('predicts classification of most similar config', function() {
        var trainingSet = [
            [ Config(conf1), false ],
            [ Config(conf3), true ],
            [ Config(conf4), false ]
        ];
        var myZendo = new Zendo(trainingSet);
        expect(myZendo.predict(conf2)).toEqual(true);
    });

    it('hasNMatchingProperties returns true for n=properties.length for identical items', function() {
        var myConfig = new Config([]);
        expect(myConfig.hasNMatchingProperties(2, item1, item1)).toEqual(true);
    });

    it('hasNMatchingProperties returns false for n=properties.length for non-identical items', function() {
        var myConfig = new Config([]);
        expect(myConfig.hasNMatchingProperties(2, item1, item2)).toEqual(false);
    });

    it('hasNMatchingProperties returns true for n=1 for items that share a property', function() {
        var myConfig = new Config([]);
        expect(myConfig.hasNMatchingProperties(1, item1, item2)).toEqual(true);
    });

    it('hasNMatchingProperties returns false for n=1 for items that have no property in common', function() {
        var myConfig = new Config([]);
        expect(myConfig.hasNMatchingProperties(1, item1, item3)).toEqual(false);
    });

    it('getMajorityPrediction returns true if maxScoringSet = 1 valid config', function() {
        var trainingSet = [
            [ Config(conf1), false ],
            [ Config(conf3), true ],
            [ Config(conf4), false ]
        ];
        var myZendo = new Zendo(trainingSet);
        expect(myZendo.getMajorityPrediction([1])).toEqual(true);
    });

    it('getMajorityPrediction returns false if maxScoringSet = 1 valid config, 2 invalid', function() {
        var trainingSet = [
            [ Config(conf1), false ],
            [ Config(conf3), true ],
            [ Config(conf4), false ]
        ];
        var myZendo = new Zendo(trainingSet);
        expect(myZendo.getMajorityPrediction([0,1,2])).toEqual(false);
    });

    it('Config.calcSimiliarity returns correct scores', function() {
        var testConfig = new Config(conf2);
        expect(testConfig.calcSimilarity(conf1)).toEqual(1.5);
        expect(testConfig.calcSimilarity(conf2)).toEqual(6);
        expect(testConfig.calcSimilarity(conf3)).toEqual(3.5);
        expect(testConfig.calcSimilarity(conf4)).toEqual(0.5)
    });

    it('returns known classification for config given in training set', function() {
        var validConfigInst = new Config(conf2);
        var invalidConfigInst = new Config(conf1);
        var trainingSet = [
            [ validConfigInst, true ],
            [ invalidConfigInst, false ]
        ];
        var myZendo = new Zendo(trainingSet);
        expect(myZendo.predict(conf2)).toEqual(true);
        expect(myZendo.predict(conf1)).toEqual(false);
    });

});
