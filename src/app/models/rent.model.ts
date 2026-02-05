import { CustomerModel } from "./customer.model";

export interface RentModel {
  idRent: number;
  customer: CustomerModel;
  deliveryDate: string;
  eventAddress: string;
  state: string;
  totalAmount: number;
  rentalDays: number;
  withdrawalDate: string;
  lastModificationDate: string;
  

}