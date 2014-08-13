describe("Zendo", function() {

    var conf1 = [
        { color: 'blue', size: 'M' },
        { color: 'red', size: 'S' }
    ];
    var conf2 = [
        { color: 'green', size: 'M' },
    ];

    it('Config.isSameAs detects if configs are identical', function() {
        var validConfigInst = new Config(conf1);
        expect(validConfigInst.isSameAs(conf1)).toEqual(true);
        expect(validConfigInst.isSameAs(conf2)).toEqual(false);
    });

    it('returns known classification for config given in training set', function() {
        var validConfigInst = new Config(conf1);
        var invalidConfigInst = new Config(conf2);
        var trainingSet = [
            [ validConfigInst, true ],
            [ invalidConfigInst, false ]
        ];
        var myZendo = new Zendo(trainingSet);
        expect(myZendo.predict(conf1)).toEqual(true);
        expect(myZendo.predict(conf2)).toEqual(false);
    });

});
