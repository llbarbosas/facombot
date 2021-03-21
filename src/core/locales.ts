import { randomBetween } from '@core/util';
import locales from '../locales.json';
import _ from 'lodash';

export function getRandomPhrase(phrasesKey: keyof typeof locales, builderData?: Record<string, unknown>): string {
    const phrases = locales[phrasesKey];

    return _.template(phrases[randomBetween(0, phrases.length - 1)])(builderData);
}
