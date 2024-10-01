import React from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import "../../styles/card.css"
export const Course = ({ course }) => {
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <div className="course_card">
            <Card title={course.name || 'Course Name Unavailable'} subTitle={course.stack || 'Stack Unavailable'} header={header} className="md:w-25rem">
                {/* <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p> */}
                <p className="prerequisites m-0">Pre-Requisite:  <b>{course.prerequisites || 'Unknown'}</b></p>
                <p className="posted-by m-0">Posted At: <b>{course.postedby || 'Unknown'}</b></p>
                <p className="est-duration m-0">Duration: <b>{course.est_duration || 'Unknown'}</b></p>
            </Card>
            </div>
        </div>
    )
}
        