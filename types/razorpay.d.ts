declare namespace RazorpayCheckout {
  interface Options {
    key: string;
    amount: number;
    currency: string;
    name: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: {
      email?: string;
      contact?: string;
      name?: string;
    };
    theme?: {
      color?: string;
    };
  }

  interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }
}

declare class Razorpay {
  constructor(options: RazorpayCheckout.Options);
  open(): void;
}
