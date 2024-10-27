import { PropsShouldWithChildren } from "../../share/types";
import { AppBar } from "./app-bar";


export function MobileLayout({ children }: PropsShouldWithChildren) {
  return (
    <div className="mobile-layout">
      <div className="mobile-layout__container">
        <AppBar>
          <AppBar.DefaultContent icon={2} />
        </AppBar>
        {children}
      </div>
    </div>
  );
}
