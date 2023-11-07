declare global {
  interface SubCampaign {
    name: string;

    status: boolean;

    ads: {
      name: string;

      quantity: number;
    }[];
  }
  interface Campaign {
    information: {
      name: string;

      describe?: string;
    };

    subCampaigns: SubCampaign[];
  }
}
export {};
