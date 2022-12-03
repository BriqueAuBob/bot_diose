export interface WebhookConfig {
  id: string;
  token: string;
  title: string;
  description: string;
}

export interface WebhooksConfig {
  [key: string]: WebhookConfig;
}
