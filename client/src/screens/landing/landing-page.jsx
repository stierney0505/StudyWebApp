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
            <div className="customize-SM-container">
                <MTxt id="customize-header">Customize your study material to fit your subject</MTxt>
                <div className="question-types">
                    <div className="flashcards">
                        <div className="flashcards-graphic">
                            <img id="f-graphic" src="./../../assets/f-graphic.png" alt="flashcards graphic" />
                        </div>
                        <div className="flashcards-text">
                            <MTxt id="f-header">Flashcards</MTxt>
                            <STxt id="f-text">Create term-solution pairs to identify key concepts.</STxt>
                        </div>
                    </div>
                    <div className="multiple-choice">
                        <div className="mc-graphic">
                            <img id="f-graphic" src="./../../assets/mc-graphic.png" alt="multiple choice graphic" />
                        </div>
                        <div className="mc-text">
                            <MTxt id="f-header">Multiple Choice & Multi-Select</MTxt>
                            <STxt id="f-text">Test your knowledge with multiple choice and multi-select questions.</STxt>
                        </div>
                    </div>
                    <div className="fill-in-the-blank">
                        <div className="fitb-graphic">
                            <img id="f-graphic" src="./../../assets/fitb-graphic.png" alt="fill in the blank graphic" />
                        </div>
                        <div className="fitb-text">
                            <MTxt id="f-header">Fill In the Blank</MTxt>
                            <STxt id="f-text">Create fill in the blank question templates to understand larger concepts.</STxt>
                        </div>
                    </div>
                </div>
                <div className="call-to-action">
                    {/* href="/create-account" */}
                    <Link id="login-link" underline={true}>Login</Link>
                    <InputButton id="get-started-button" text="Get Started">
                        <Link href="/create-account" />
                    </InputButton>
                </div>
            </div>

        </>
    );
}

export default LandingPage;