// ponytail: minimal lexicon sentiment, replaces the heavy `natural` dependency
const POSITIVE = new Set([
  'excelente', 'bueno', 'buena', 'genial', 'perfecto', 'perfecta', 'increíble',
  'impresionante', 'amor', 'feliz', 'ideal', 'único', 'única', 'mejor',
  'hermoso', 'hermosa', 'fantástico', 'fantástica', 'maravilloso'
]);
const NEGATIVE = new Set([
  'malo', 'mala', 'terrible', 'horrible', 'peor', 'feo', 'fea', 'roto', 'rota',
  'defectuoso', 'defectuosa', 'lento', 'lenta', 'caro', 'cara', 'difícil',
  'pésimo', 'pésima', 'aburrido', 'aburrida'
]);

function analyzeSentiment(text = '') {
  const words = String(text).toLowerCase().match(/[a-záéíóúñü]+/g) || [];
  let score = 0;
  for (const w of words) {
    if (POSITIVE.has(w)) score++;
    else if (NEGATIVE.has(w)) score--;
  }
  return {
    text,
    score,
    classification: score > 0 ? 'positivo' : score < 0 ? 'negativo' : 'neutral'
  };
}

function analyzeGiftDescription(description) {
  const result = analyzeSentiment(description);
  return {
    ...result,
    recommendation: result.score > 0 ? 'Excelente regalo' : 'Considerar mejorar descripción'
  };
}

module.exports = { analyzeSentiment, analyzeGiftDescription };
