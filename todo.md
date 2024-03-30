# Todo Endpoints

## Customer

- Login/Register with google
- Login/Register with facebook
- Login/Register with apple
- Login/Register with phone
- logout endpoint - /auth/logout

- become a barber endpoint - /user/become-barber
- get user profile endpoint - /user/profile
- update user profile endpoint - /user/profile/update
- delete account endpoint - /user/delete

- get saved places endpoint - /places
- add place endpoint - /places/add
- delete place endpoint - /places/delete/:id

- get all barbers endpoint - /barbers
  - filters
    - by rating
    - by number of bookings
    - by availability
    - by status
- get barber by id endpoint - /barbers/detail/:id
- add barber to favorite endpoint - /barbers/favorite/:id

- get orders endpoint - /orders
- get order by id endpoint - /orders/detail/:id
- cancel order endpoint - /orders/cancel/:id
- review order endpoint - /orders/review/:id

- get favorite barbers endpoint - /user/favorites


## Pagination

Pagination: https://www.prisma.io/docs/orm/prisma-client/queries/pagination

## Add admin section

## Barber

- Change online status endpoint - /barber/update-available
- Get all orders endpoint - /barber/orders
  - filters
    - by status
- Get order by id endpoint - /barber/orders/detail/:id
- Update order appointment status endpoint - /barber/orders/update-appointment-status/:id
  - types
    - pending
    - accepted
    - rejected
    - started
    - completed
- Get earnings endpoint - /barber/earnings
  - filters
    - range
      - start date
      - end date
- Get barber stats endpoint - /barber/profile

- Get balance endpoint - /barber/balance
- Get today's earning endpoint - /barber/earnings/today
- List bank accounts endpoint - /bank-accounts
- Add bank account endpoint - /bank-accounts/add
- Cash out endpoint - /bank-accounts/cash-out/:bankAccountId