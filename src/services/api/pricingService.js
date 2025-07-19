import pricingData from "@/services/mockData/pricingTiers.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PricingService {
  constructor() {
    this.tiers = [...pricingData];
  }

  async getAll() {
    await delay(200);
    return [...this.tiers];
  }

  async getById(id) {
    await delay(200);
    const tier = this.tiers.find(t => t.Id === parseInt(id));
    if (!tier) {
      throw new Error("Pricing tier not found");
    }
    return { ...tier };
  }
}

export const pricingService = new PricingService();