import { Stats } from 'webpack';
declare function formatWebpackMessages(statsJson: Stats.ToJsonOutput, context: string): {
    warnings: string[];
    errors: string[];
};
export default formatWebpackMessages;
