{{--
    The unlock page.

    Deliberately plain, and it is the first thing a partner sees, so the copy
    does the work the design does not: say what this is and where the password
    came from. An unbranded password box is indistinguishable from a phishing
    prompt, which is a poor way to open a partner relationship.

    No JavaScript. A form post works before anything has hydrated and cannot
    fail halfway.
--}}
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MetaSearch API demo</title>
<link rel="stylesheet" href="{{ asset('assets/app.css') }}">
</head>
<body>
<main class="flex min-h-dvh items-center justify-center bg-page px-4 py-16">
  <div class="w-full max-w-sm">
    <h1 class="text-xl font-semibold tracking-tight text-text-primary">MetaSearch API demo</h1>
    <p class="mt-2 text-sm leading-relaxed text-text-secondary">
      This demo runs against Radix&rsquo;s live domain search API, so it is
      behind a shared password. Use the one from your invitation.
    </p>

    <form method="post" action="{{ route('gate.unlock') }}" class="mt-6 flex flex-col gap-3">
      @csrf

      <label for="gate-password" class="text-sm font-medium text-text-primary">Password</label>
      <input
        id="gate-password"
        name="password"
        type="password"
        autocomplete="current-password"
        autofocus
        required
        @if (session('error')) aria-describedby="gate-error" aria-invalid="true" @endif
        class="h-11 rounded-[var(--radius-cta)] border border-stroke-default bg-card px-3 text-base text-text-primary outline-none focus-visible:border-stroke-strong"
      >

      {{--
        role="alert" and present only on failure, matching the search card's
        validation message: the node appearing IS the announcement.
      --}}
      @if (session('error'))
        <p id="gate-error" role="alert"
           class="rounded-md bg-accent-coral-tint px-3 py-2 text-xs font-medium text-accent-coral-ink">
          @if (session('error') === 'throttled')
            Too many attempts from this address. Wait a minute, then try again.
          @else
            That password did not match. Check it against the invitation and try again.
          @endif
        </p>
      @endif

      <button type="submit"
              class="mt-1 flex h-11 items-center justify-center rounded-[var(--radius-cta)] bg-accent-green px-5 text-sm font-semibold text-on-accent">
        Unlock
      </button>
    </form>

    <p class="mt-6 text-xs leading-relaxed text-text-tertiary">
      The password is shared across everyone invited to this demo. It gates
      access to a rate-limited API key, not to any account or data of yours.
    </p>
  </div>
</main>
</body>
</html>
