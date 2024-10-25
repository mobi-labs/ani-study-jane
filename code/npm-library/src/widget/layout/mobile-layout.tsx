import { PropsShouldWithChildren } from '@/share/types'
import { AppBar } from '@/widget/layout/app-bar'

export function MobileLayout({ children }: PropsShouldWithChildren) {
  return (
    <div className="h-[852px] w-[393px]">
      <div className="border-grey-scale-grey-05 h-full w-full border-[1px] border-solid">
        <AppBar>
          <AppBar.DefaultContent icon={2} />
        </AppBar>
        {children}
      </div>
    </div>
  )
}
