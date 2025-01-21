export interface promotionInterface {
    id: number;
    name: string;
    description: string;
    discountPercentage: number;
    discountAmount: number;
    minimumPrice: number;
    isActive: boolean;
}