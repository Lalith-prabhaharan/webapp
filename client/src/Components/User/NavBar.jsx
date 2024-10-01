import React from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import 'primereact/resources/themes/saga-blue/theme.css';  
// import 'primereact/resources/primereact.min.css';           
// import 'primeicons/primeicons.css';           
// import logo from "../images/logo.jpg"              

export const NavBar = () => {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            link:'/',   
        },
        {
            label: 'Features',
            icon: 'pi pi-star',
        },
        {
            label: 'Todo',
            icon: 'pi pi-todo',
            items: [
                {
                    label: 'Completed',
                    icon: 'pi pi-check',
                    template: itemRenderer
                },
                {
                    label: 'Pending',
                    icon: 'pi pi-pending',
                    badge:'3',
                    template: itemRenderer
                },
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
        },
        {
            label:'Profile',
            icon: 'pi pi-profile',
            items:[
                {
                    label: 'View Profile',
                    template: itemRenderer
                },
                {
                    label: 'Logout',
                    template: itemRenderer
                }
            ]
        }
    ];

    const start = <img alt="logo"  height="70" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto search " />
            {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className='profile'  shape="circle" /> */}
        </div>
    );
  return (
    <div className='card'>
        <Menubar model={items} start={start} end={end} />
    </div>
  )
}
