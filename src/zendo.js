function Zendo(trainingSet) {

    return {
        predict: function(config) {
            var maxScore = 0;
            var maxScoringIndexes = [];
            for (var i=0; i<trainingSet.length; i++) {
                var simScore = trainingSet[i][0].calcSimilarity(config);
                if (simScore > maxScore) {
                    maxScore = simScore;
                    maxScoringIndexes = [i];
                } else if (simScore == maxScore) {
                    maxScoringIndexes.push(i);
                }
            }
            return this.getMajorityPrediction(maxScoringIndexes);
        },
        getMajorityPrediction: function(maxScoringIndexes) {
            var prediction = this.getRandomBoolean();
            var trueCounter = 0;
            var falseCounter = 0;

            for (var i = 0; i<maxScoringIndexes.length; i++) {
                if (trainingSet[maxScoringIndexes[i]][1]) {
                    trueCounter++;
                } else {
                    falseCounter++;
                }
            }
            if (trueCounter > falseCounter) {
                prediction = true;
            } else if (falseCounter > trueCounter) {
                prediction = false;
            }
            return prediction;
        },
        getRandomBoolean: function() {
            return Math.random() > 0.5;
        }
    }
}

function Config(trainingConfig) {
    return {
        calcSimilarity: function(config) {
            var simScore = 0;
            var clonedConfig = JSON.parse( JSON.stringify(config) );
            var clonedTrainingConfig = JSON.parse( JSON.stringify(trainingConfig) );

            var numberOfProperties = Object.keys(config[0]).length;
            for (var h=numberOfProperties; h>0; h--) {
                for (var i=0; i<clonedConfig.length; i++) {
                    for (var k=0; k<clonedTrainingConfig.length; k++) {
                        if (this.hasNMatchingProperties(h, clonedConfig[i], clonedTrainingConfig[k])) {
                            simScore += h;
                            clonedConfig.remove(i);
                            i--;
                            clonedTrainingConfig.remove(k);
                            break;
                        }
                    }
                }
            }

            var unmatchedItems = Math.abs(clonedConfig.length - clonedTrainingConfig.length);
            simScore -= unmatchedItems * (numberOfProperties / 2);

            return simScore;
        },
        hasNMatchingProperties: function(n, config, trainingConfig) {
            var hasNMatches = true;
            var propertyKeys = Object.keys(config);
            var allowedMismatches = propertyKeys.length - n;
            var foundMismatches = 0;
            var curKey;
            for (var i=0; i<propertyKeys.length; i++) {
                curKey = propertyKeys[i];
                if (config[curKey] != trainingConfig[curKey]) {
                    foundMismatches++;
                }
                if (foundMismatches > allowedMismatches) {
                    hasNMatches = false;
                    break;
                }
            }
            return hasNMatches;
        }
    }
}


/******** Helpers ***********/

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
