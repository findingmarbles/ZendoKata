describe("Zendo", function() {
    var conf1 = [
        { color: 'red', size: 'S' }
    ];
    var conf2 = [
        { color: 'blue', size: 'M' },
        { color: 'red', size: 'S' }
    ];
    var conf3 = [
        { color: 'blue', size: 'M' },
        { color: 'red', size: 'S' },
        { color: 'green', size: 'M' }
    ];
    var conf4 = [
        { color: 'blue', size: 'S' }
    ];

    it('Config.calcSimiliarity returns correct scores', function() {
        var testConfig = new Config(conf2);
        expect(testConfig.calcSimilarity(conf1)).toEqual(1);
        expect(testConfig.calcSimilarity(conf2)).toEqual(4);
        expect(testConfig.calcSimilarity(conf3)).toEqual(3);
        expect(testConfig.calcSimilarity(conf4)).toEqual(0)
    });

    it('Config.isSameAs detects if configs are identical', function() {
        var validConfigInst = new Config(conf2);
        expect(validConfigInst.isSameAs(conf1)).toEqual(false);
        expect(validConfigInst.isSameAs(conf2)).toEqual(true);
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
