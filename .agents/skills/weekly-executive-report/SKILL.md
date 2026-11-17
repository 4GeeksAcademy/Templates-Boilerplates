---
name: weekly-executive-report
description: "Prepare TrackFlow's weekly executive report from supplied operational data, with country comparisons and auditable KPI and alert handling."
---

# Weekly Executive Report

## Objective

Prepare one accurate, auditable weekly executive report for TrackFlow leadership, comparing the United States and Spain using the operational data supplied for the requested reporting period.

This supports the recurring report described in `CONTEXT.md`, which is intended to be generated every Monday by 07:00. This skill prepares report content only; it does not access company systems, fetch data, or schedule execution.

## When to Use

Use this skill when asked to prepare or validate TrackFlow's weekly executive report. Do not use it for customer-specific reports, operational dashboards, or ad hoc analysis unrelated to the executive report.

## Inputs

Required inputs:

- Reporting period start and end, including the date convention used.
- Reporting timezone. `CONTEXT.md` specifies Monday at 07:00 but does not specify a timezone; do not infer one.
- Separate United States and Spain data for each available KPI: shipment volume, on-time delivery rate, operating cost, returns, and customer satisfaction.
- For every KPI value: unit, definition, source, and data-as-of timestamp.

Provide these additional inputs whenever applicable:

- Numerators and denominators for rates, and the aggregation method for global values.
- Currency and any approved exchange rate, rate date, and source when operating costs use different currencies.
- Alert thresholds, their comparison direction (for example, above or below), and units. Do not create thresholds.
- Prior-period values and definitions when a week-over-week comparison is requested.
- Operational notes or incidents to include, with their source and date.
- Preferred report language. If omitted, use the language of the request.

If required information is missing, continue only if a useful report can be produced; mark each missing item explicitly and identify the limitation. Never fabricate values or silently assume definitions, timezone, currency conversions, or thresholds.

## Procedure

1. Confirm the reporting period and timezone. If timezone is missing, state that the Monday 07:00 target cannot be interpreted unambiguously.
2. Check the supplied data by country, KPI, unit, definition, source, and data-as-of timestamp. Identify missing, stale, or incomparable inputs.
3. Produce global values only when they are supplied with provenance or can be recalculated from compatible country-level data and the required aggregation inputs. Do not average country rates unless the correct numerators and denominators support that calculation. Do not combine costs in different currencies without an approved conversion input.
4. Compare values with alerts only when a threshold and its direction and unit are provided. State the observed value, threshold, and source for each triggered alert.
5. Produce the report using the required output structure and run the acceptance checklist before returning it.

## Output

Return these sections in order:

1. **Reporting period and freshness**: period, timezone, report generation time if supplied, and the data-as-of time for each source.
2. **Executive summary**: concise findings supported by supplied data; do not make unsupported causal claims.
3. **KPI comparison**: a table with one row per required KPI and columns for United States, Spain, and Global. Include value, unit, and definition or source reference. Use `Not provided` for missing values.
4. **Alerts**: triggered thresholds with observed values and sources, or `No thresholds provided` when none were supplied.
5. **Data quality and limitations**: missing or stale inputs, incompatible definitions or units, and any limits on global aggregation or timezone interpretation.

## Acceptance Criteria

The report is acceptable only when all of the following can be verified:

- The reporting period is stated, and the timezone is stated or explicitly marked as not provided.
- All five KPIs from `CONTEXT.md` appear: shipment volume, on-time delivery rate, operating cost, returns, and customer satisfaction. Missing country values are marked `Not provided`, not omitted or guessed.
- Every reported KPI value has a unit and a supplied definition and source; its data-as-of timestamp is included or called out as missing.
- Each global value is either supplied with provenance or reproducible from compatible country inputs using the provided aggregation method. Rates are not calculated by averaging percentages, and costs are not combined across currencies without an approved conversion.
- Each alert is traceable to a supplied threshold, direction, unit, observed value, and source. No threshold is invented.
- The summary contains no figures, assumptions, or causal explanations that cannot be traced to the inputs.
- Data gaps and limitations are visible in the report, and all five output sections are present.

If any criterion cannot be met because the inputs are incomplete, return the report with the relevant limitation clearly marked rather than filling the gap with an assumption.