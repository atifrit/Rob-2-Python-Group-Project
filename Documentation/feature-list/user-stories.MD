Sign Up:
If user is not signed in, There should be a button on the landing page that opens a sign-up form.
    On the signup form:
    User should be able to enter username, email, password then have a button to sign up. This should also log the user into the new account.
    Sign up form will show validation errors in red text and will have a disabled sign-up button when required fields are empty.

Log in:
    On the landing page, There should be a button next to the sign-up button to log in. It should ask for a credential (username or email) and password. It will redirect to the landing page on successful login and display validation errors in red text when it fails.

Log Out:
    When logged in, the sign up and login buttons should be replaced with a log out button that logs out the user and redirects to the landing page.

Portfolio:
    When logged in, There should be a portfolio link accessible to the user in their user drop down menu (along with the logout button).
    This button should redirect to the /portfolio page which will be populated with user specific information on their portfolio.
    When not logged in, the /portfolio page should show a link to sign up or log in.

Watchlist:
    When logged in, there should be a watchlist button in the user dropdown that redirects to /watchlist. There, the user will see the stocks they have added to their watchlist or a message telling them their watchlist stocks will appear here.
    When not logged in, the /watchlist page should show a link to sign up or log in.

Search:
    On the landing page, there should be a search bar the user can type into and submit. It should redirect to a page of links that match with the query.
    When clicking on any of these links, the user should be directed to that stock's stock detail page.

Stock Details:
    On a stock detail page there should be information about the stock such as ceo, founding date, and some relevant statistics such as avg_volume. There will also be a graph showing the history of the stock price over time.
    When logged in, there should be options to make a purchase or add the stock to the watchlist.
    When not logged in, the information is still accessible to the user, but the options to purchase the stock or add it to the watchlist are not displayed to the user.
    They should have access to their user drop down menu on these pages to have access to sign up, login, logout, etc functionality.
