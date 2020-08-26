export interface SuggesterEnvironment {
}
export interface SuggesterService {
    suggest(form: {}, environment: SuggesterEnvironment): Promise<string>;
}
