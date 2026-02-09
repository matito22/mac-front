//Es igual al rent model pero con el id del customer, no el customer entero
export interface RentListModel {
  customerId: number | null; // 👈 objeto completo
  deliveryDate: string | null;
  withdrawalDate: string | null;
  eventAddress: string;
  requestingUserId: number;
  deliveryTime: string | null;
  withdrawalTime: string | null;

}
