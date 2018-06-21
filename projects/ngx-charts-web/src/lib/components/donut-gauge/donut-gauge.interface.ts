// customizable configuration for the donut
// all fields are optional since there's a default config to cover for
// unspecified fields
export interface IDonutGaugeConfig {
    strokeWidth?: number;
    gradientColors?: Array<string>;
    baseColor?: string;
    textColor?: string;
    gradientDirection?: number;
    label?: string;
    title?: string;
}
