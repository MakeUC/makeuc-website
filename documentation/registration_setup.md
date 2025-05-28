# Toggling Registration
We need to turn registration on and off each year for MAKEUC, here is how:

## Turning Registration Off
Here's steps for disabling registration when it closes.
### Go to the [home page](../client/src/app/page.tsx)
1. Ctrl+F for "registration"
2. Comment out the registration link like so:
```
{/*<Link href="/registration" className="" tabIndex={-1}>
  <Button className="flex gap-2 mt-4 titillium-web-bold" size="lg">Register Now!</Button>
</Link>*/}
```
### Go to the [registration page](../client/src/app/registration/page.tsx)
1. Uncomment the registration page link
```
{/*<RegistrationForm />*/}

|
v

<RegistrationForm />
```
2. Comment out the registration closed text
```
<div>Registration is currently closed</div>

|
v

{/*<div>Registration is currently closed</div>*/}
```

You're done! registration is now closed, good jorb :D

## Turning Registration Off