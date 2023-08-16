# ASK Metrics v2

> [!WARNING]
> This is a beta release of the ASK Metrics v2 API. The API and documentation are subject to change.

## Overview
ASK Metrics v2 allows you to fetch metrics from your Alexa skill. You can use these metrics to build your own custom analytics dashboards or to integrate with your existing analytics systems.

ASK Api reference: https://developer.amazon.com/en-US/docs/alexa/smapi/metrics-api.html

## Getting Started
### Installation
```bash
npm install --save ask-metrics-v2
```

### Usage

For refresh token, see [ASK Smapi SDK Documentation](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/blob/2.0.x/ask-smapi-sdk/README.md)

## Edxample

```typescript
import {
  RefreshTokenConfig,
  createClient,
  AggregationPeriod,
  Metrics,
  Stat,
  MetricsV2RequestOptions,
} from "ask-metrics-v2";

// Skill ID to fetch metrics for
const skillId = 'amzn1.ask.skill.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

// Refresh Token to authenticate with
// See ASK Smapi SDK documentation for more information
const refreshTokenConfig: RefreshTokenConfig = {
  clientId
  clientSecter,
  refreshToken,
};

void main() {
  // Setup client
  const client = createClient(refreshTokenConfig);

  // Create request options
  const requestOptions: MetricsV2RequestOptions = {
    startTime: Date.now()-1000*60*60*24*30, // 30 days before
    endTime: Date.now(),
    metricQueries: [
      {
        id: "m2",
        name: Metrics.Custom.CUSTOMERS,
        metricNamespace: Metrics.Custom.namespace,
        aggregationPeriod: AggregationPeriod.BY_DAY,
      }
    ]
  };

  // Get metrics
  const metrics = await client.getSkillMetricsV2(skillId, requestOptions);

  // Print metrics
  console.log("Metrics:");
  console.log(JSON.stringify(metrics, null, 2));
}

main();
``````
