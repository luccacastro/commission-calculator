import BandBreakdownItem from "../types/BandBreakdownItem";

export const PRICE_BREAKDOWN_COLORS: Array<string> = ['#40E0D0', '#008080', '#5F9EA0', '#4682B4', '#1E90FF'];
export const PRICE_BREAKDOWN_PLACEHOLDER: BandBreakdownItem[] = [
  {
    label: "£0 - £5k (0%)",
    value: 0,
    rate: 0,
    color: "#40E0D0"
  },
  {
    label: "£5k - £10k (10%)",
    value: 0,
    rate: 0.1,
    color: "#008080"
  },
  {
    label: "£10k - £15k (15%)",
    value: 0,
    rate: 0.15,
    color: "#5F9EA0"
  },
  {
    label: "£15k - £20k (20%)",
    value: 0,
    rate: 0.2,
    color: "#4682B4"
  },
  {
    label: "£20k+ (25%)",
    value: 0,
    rate: 0.25,
    color: "#1E90FF"
  }
];