/* eslint-disable no-console */
/**
 * Utility functions for OpenAI API cost calculation
 */

// Cost constants in euros
const TOKEN_PROMPT_COST = 0.0000000015;
const TOKEN_COMPLETION_COST = 0.000000006;
const API_CALL_COST = 0.0001;

export interface CostCalculationResult {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    singleCallCost: number;
    estimatedCostPer1000Calls: number;
    model: string;
}

/**
 * Calculates the cost of an OpenAI API call
 *
 * @param {object} apiResponse - The response from the OpenAI API
 * @returns {CostCalculationResult} - Object containing cost calculation results
 */
export function calculateApiCost(apiResponse: any): CostCalculationResult {
    const promptTokens = apiResponse.usage?.prompt_tokens || 0;
    const completionTokens = apiResponse.usage?.completion_tokens || 0;
    const totalTokens = promptTokens + completionTokens;

    // Calculate cost
    const singleCallCost =
        promptTokens * TOKEN_PROMPT_COST + completionTokens * TOKEN_COMPLETION_COST + API_CALL_COST;

    const estimatedCostPer1000Calls = singleCallCost * 1000;

    return {
        promptTokens,
        completionTokens,
        totalTokens,
        singleCallCost,
        estimatedCostPer1000Calls,
        model: apiResponse.model || 'unknown',
    };
}

/**
 * Logs cost calculation to console
 *
 * @param {CostCalculationResult} costResult - The cost calculation result
 */
export function logCostCalculation(costResult: CostCalculationResult): void {
    console.log('Using model:', costResult.model);
    console.log(`Prompt tokens used: ${costResult.promptTokens}`);
    console.log(`Completion tokens used: ${costResult.completionTokens}`);
    console.log(`Total tokens used: ${costResult.totalTokens}`);
    console.log(`Single call cost: €${costResult.singleCallCost}`);
    console.log(`Estimated cost for 1000 calls: €${costResult.estimatedCostPer1000Calls}`);
}
