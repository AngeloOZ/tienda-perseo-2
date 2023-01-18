import ThemeContrast from './ThemeContrast';
import ThemeColorPresets from './ThemeColorPresets';
import SettingsDrawer from './drawer';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        {children}
        <SettingsDrawer />
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
