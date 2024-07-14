import Link from "../../components/links/link";
import InputButton from "../../components/button/button";
import { LTxt, MTxt, STxt } from "../../components/text/text";
import { Education, Notebook, GroupPresentation } from "@carbon/icons-react";
import './landing-page.css';


const LandingPage = () => {

    return (
        <>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="text-main">
                    <LTxt id="text-main-L">Enhancing Knowledge</LTxt>
                    <MTxt id="text-main-M">With Dynamic Study Material</MTxt>
                </div>
                <div className="text-secondary">
                    <STxt id="text-main-S">From STEM subjects to the humanities, Study Web App gives learners, instructors, and publishers access to incredible tools to create custom study materials for all to explore. </STxt>
                </div>
                <div className="call-to-action">
                    {/* href="/create-account" */}
                    <Link id="login-link" underline={true}>Login</Link>
                    <InputButton id="get-started-button" text="Get Started">
                        <Link href="/create-account" />
                    </InputButton>
                </div>
                
            </div>

            {/* Features */}
            <div className="features-container">
                <MTxt id="section-header">Whether you are a student, instructor, or publisher, Study Web App has the tools for you</MTxt>
                <div className="features">
                    <div className="feature-learners">
                        <Education size={30}/>
                        <MTxt id="feature-header">Students</MTxt>
                        <STxt>As a student, you can create and share your own custom study material, join study and learning groups, track your progress, and study the way you learn best.</STxt>
                    </div>
                    <div className="feature-instructors">
                        <GroupPresentation size={30}/>
                        <MTxt id="feature-header">Instructors</MTxt>
                        <STxt>As an instructor, you are able to create learner groups to track your student&apos;s progress. You can add any study material in a learner group, and even add TAs to help manage the group.</STxt>
                    </div>
                    <div className="feature-publishers">
                        <Notebook size={30}/>
                        <MTxt id="feature-header">Publishers</MTxt>
                        <STxt>As a publisher, you can create official study material associated with your published work. Set the visibility of your material for both learns and instructors to access.</STxt>
                    </div>
                </div>
            </div>

            {/* Customize Your Study Material */}






            {/* <InputButton text="Input Button" /><br></br><br></br>
            <TextField type="text" onChange={setText} value={text} text='Username' />
            <p>{text}</p>
            <TextArea type="text" onChange={setArea} value={area} text='Biography' />
            <p>{area}</p>
            <DropDown hint="Select Role" options={options} text="Choose Car" /><br /><br />
            <RadioButton options={radioOptions} /><br />
            <CheckBoxes options={checkboxOptions} /><br />
            <STxt>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nisi explicabo ab exercitationem quidem, porro architecto ducimus tempora cum adipisci sunt eaque assumenda officia facilis repellendus, modi deserunt, dolor at?</STxt>
            <MTxt>Medium Text</MTxt><br />
            <LTxt>Large Text</LTxt><br />
            <Link href="/" underline={true} >Link to URL</Link><br /><br />
            <Footer /><br /> */}
        </>
    );
}

export default LandingPage;