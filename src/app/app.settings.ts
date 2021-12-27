import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'ALLIANCE TECHNOLOGIE',
        'Angular Admin Template with Bootstrap 4',
        {
            menu: 'vertical', //horizontal , vertical
            menuType: 'compact', //default, compact, mini
            showMenu: true,
            navbarIsFixed: true,
            footerIsFixed: true,
            sidebarIsFixed: true,
            showSideChat: false,
            sideChatIsHoverable: true,
            skin:'grey',//light , dark, blue, green, combined, purple, orange, brown, grey, pink',SNDP          
        }
    )
}