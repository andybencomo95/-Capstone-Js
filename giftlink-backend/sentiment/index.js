const natural = require('natural');
const { SentimentAnalyzer } = natural;
const { WordTokenizer } = natural;

const analyzer = new SentimentAnalyzer();
const tokenizer = new WordTokenizer();

// Analizar sentimiento de un texto
function analyzeSentiment(text) {
    const tokens = tokenizer.tokenize(text);
    const sentiment = analyzer.getSentiment(tokens);
    
    return {
        text: text,
        score: sentiment,
        classification: sentiment > 0 ? 'positivo' : 
                        sentiment < 0 ? 'negativo' : 
                        'neutral'
    };
}

// Analizar descripción de regalo
function analyzeGiftDescription(description) {
    const result = analyzeSentiment(description);
    
    return {
        ...result,
        recommendation: result.score > 0 ? 
            '¡Excelente regalo!' : 
            'Considerar mejorar descripción'
    };
}

module.exports = {
    analyzeSentiment,
    analyzeGiftDescription
};