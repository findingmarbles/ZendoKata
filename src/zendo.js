function Zendo(trainingSet) {

    return {
        predict: function(config) {
            for (var i=0; i<trainingSet.length; i++) {
                if (trainingSet[i][0].isSameAs(config)) {
                    return trainingSet[i][1];
                }
            }
        }
    }
}

function Config(myConfig) {
    return {
        // TODO: Make independent of order! - Copy array and remove matched obj
        isSameAs: function(config) {
            if (myConfig.length != config.length) {
                return false;
            }
            for (var i=0; i<myConfig.length; i++) {
                if (myConfig[i].color != config[i].color || myConfig[i].size != config[i].size) {
                    return false;
                }
            }
            return true;
        }

        // TODO: calcSimilarity()
        // TODO: if several max similar -> majority vote
        // TODO: Fallback Zufall?
    }
}