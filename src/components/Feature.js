import React, { Fragment } from "react";
// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";
/**
 * We need a new component called Searchable which:
 *
 * Has a template like this:
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 *
 * When someone clicks the anchor tag, you should:
 *
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 *
 * Then start a try/catch/finally block:
 *
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch:
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = ({
  setIsLoading,
  searchTerm,
  searchValue,
  setSearchResults,
}) => {
  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          try {
            const results = await fetchQueryResultsFromTermAndValue(
              searchTerm,
              searchValue
            );
            setSearchResults(results);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {searchValue}
      </a>
    </span>
  );
};
/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */
const Feature = ({ setIsLoading, featuredResult, setSearchResults }) => {
  return (
    <Fragment>
      <main id="feature">
        {featuredResult && (
          <div className="object-feature">
            <header>
              <h3>{featuredResult.title}</h3>
              <h4>{featuredResult.dated}</h4>
            </header>
            <ul>
              <b>
                {featuredResult.title ? (
                  <section className="facts">
                    <span className="title">Title </span>
                    <span className="content">{featuredResult.title}</span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.dated ? (
                  <section className="facts">
                    <span className="title">Dated </span>
                    <span className="content">{featuredResult.dated}</span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.images ? (
                  <section className="facts">
                    <span className="title">images </span>
                    <span className="content">{featuredResult.images}</span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.description ? (
                  <section className="facts">
                    <span className="title">Description </span>
                    <span className="content">{featuredResult.description}</span>
                  </section>
                ) : null}
              </b>
              <b>
                {" "}
                {featuredResult.culture ? (
                  <section className="facts">
                    <span className="title">Culture</span>
                    <span className="content">
                      <Searchable
                        setIsLoading={setIsLoading}
                        searchTerm="culture"
                        searchValue={featuredResult.culture}
                        setSearchResults={setSearchResults}
                      />
                    </span>
                  </section>
                ) : null}{" "}
              </b>
              <b>
                {featuredResult.style ? (
                  <section className="facts">
                    <span className="title">Style </span>
                    <span className="content">{featuredResult.style}</span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.technique ? (
                  <section className="facts">
                    <span className="title">Technique</span>
                    <span className="content">
                      <Searchable
                        setIsLoading={setIsLoading}
                        searchTerm="technique"
                        searchValue={featuredResult.technique}
                        setSearchResults={setSearchResults}
                      />
                    </span>
                  </section>
                ) : null}
              </b>
               <b>
                {featuredResult.medium ? (
                  <section className="facts">
                    <span className="title">Medium</span>
                    <span className="content">
                      <Searchable
                        setIsLoading={setIsLoading}
                        searchTerm="medium"
                        searchValue={featuredResult.medium}
                        setSearchResults={setSearchResults}
                      />
                    </span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.dimensions ? (
                  <section className="facts">
                    <span className="title">Dimensions </span>
                    <span className="content">{featuredResult.dimensions}</span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.people ? (
                  <section className="facts">
                    <span className="title">Person</span>
                    <span className="content">
                      <span>
                        <Searchable
                          setIsLoading={setIsLoading}
                          searchTerm="people"
                          searchValue={featuredResult.people[0].displayname}
                          setSearchResults={setSearchResults}
                        />
                      </span>
                      {featuredResult.people[1] ? (
                        <span>
                          <span>, </span>
                          <Searchable
                            setIsLoading={setIsLoading}
                            searchTerm="people"
                            searchValue={featuredResult.people[1].name}
                            setSearchResults={setSearchResults}
                          />
                        </span>
                      ) : null}
                      {featuredResult.people[2] ? (
                        <span>
                          <span>, </span>
                          <Searchable
                            setIsLoading={setIsLoading}
                            searchTerm="people"
                            searchValue={featuredResult.people[2].name}
                            setSearchResults={setSearchResults}
                          />
                        </span>
                      ) : null}
                      {featuredResult.people[3] ? (
                        <span>
                          <span>, </span>
                          <Searchable
                            setIsLoading={setIsLoading}
                            searchTerm="people"
                            searchValue={featuredResult.people[3].name}
                            setSearchResults={setSearchResults}
                          />
                        </span>
                      ) : null}
                    </span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.department ? (
                  <section>
                    <span className="title">Department </span>
                    <span className="content">{featuredResult.department}</span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.division ? (
                  <section>
                    <span className="title">Division </span>
                    <span className="content">{featuredResult.division}</span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.contact ? (
                  <section>
                    <span className="title">Contact </span>
                    <span className="content">{featuredResult.contact}</span>
                  </section>
                ) : null}
              </b>
              <b>
                {featuredResult.credit ? (
                  <section>
                    <span className="title">Credit </span>
                    <span className="content">{featuredResult.credit}</span>
                  </section>
                ) : null}
              </b>
            </ul>
            <section className="photos">
              {featuredResult.images.map((image, index) => (
                <img key={index} src={image.baseimageurl} alt={image.alttext} />
              ))}
            </section>
          </div>
        )}
      </main>
    </Fragment>
  );
};
export default Feature;