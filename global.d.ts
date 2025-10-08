interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (options: { client_id: string; callback: (res) => void }) => void;
        renderButton: (element: HTMLElement | null, options) => void;
        prompt?: () => void;
      };
    };
  };
}