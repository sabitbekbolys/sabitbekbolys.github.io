# Plan: "Dispersive bounds for an anisotropic wave-type oscillatory integral"

**Purpose of this file.** This is the master plan for the article. The source
notes (file `notes-annulus.tex`, the text you pasted) treat only the annulus
`1/2 <= |xi| <= 2`. The article treats the **general form**

$$
\psi(t,\xi)=\int_1^t|A_s\xi|\,ds,\qquad
I(t,x)=\int_{\mathbb R^d}e^{i(x\cdot\xi-\psi(t,\xi))}\,|A_t\xi|^{-1}\,d\xi .
$$

Each section below has: what is new vs. the notes, the exact statement to
prove, the proof route, pitfalls, and a **PROMPT** block you can paste into
Opus (together with the Notation Sheet, Part 0) to produce that section.

Work order and dependencies are in Part 9. Sections 3 and 4 of the article are
copied from the notes with no change (they do not see the frequency scale),
so start with the genuinely new parts: 2.1, 2.2, 6, 7, 8.

---

## Part 0. Notation Sheet (paste at the top of EVERY prompt)

Use exactly these symbols. Do not rename anything.

* $d\ge 2$, $n=d-1$. Exponents $\ell_1,\dots,\ell_d\ge 0$,
  $\ell_{\min}=\min_j\ell_j$, $\ell_{\max}=\max_j\ell_j$.
  $A_s=\operatorname{diag}(s^{\ell_1},\dots,s^{\ell_d})$.
* $\psi(t,\xi)=\int_1^t|A_s\xi|\,ds$. It is homogeneous of degree 1 in $\xi$.
  $|A_t\xi|^{-1}$ is homogeneous of degree $-1$.
* $\chi\in C_0^\infty$, supported in $\{1/2\le|\xi|\le 2\}$, with
  $\sum_{p\in\mathbb Z}\chi(2^{-p}\xi)=1$ for $\xi\ne 0$ (Littlewood–Paley).
* **Frequency scale:** $\mu=2^p$, $p\in\mathbb Z$. (Never use $j$ for the
  dyadic index: $j$ is a direction index.)
* Dyadic piece: $I_p(t,x)=\int e^{i(x\cdot\xi-\psi)}|A_t\xi|^{-1}\chi(2^{-p}\xi)\,d\xi$.
  Rescaled piece:
  $I^{\mu}(t,x)=\int e^{i\mu(x\cdot\zeta-\psi(t,\zeta))}|A_t\zeta|^{-1}\chi(\zeta)\,d\zeta$,
  so that $I_p(t,x)=\mu^{d-1}I^{\mu}(t,x)$.
* Sector index $k$ fixed; $i,j,m$ run over $\{1,\dots,d\}\setminus\{k\}$.
  $\rho_1,\dots,\rho_d$: smooth partition of unity on $\mathbb S^{d-1}$ with
  $\rho_k(p)=0$ unless $|p_k|\ge 1/(2\sqrt d)$. $I^\mu=\sum_k I^\mu_k$.
* Ratios $\eta_j=t^{\ell_j}\xi_j/(t^{\ell_k}\xi_k)$, $\eta\in\mathbb R^n$.
* $H(\sigma,\eta)=\big(1+\sum_{j\ne k}\sigma^{2(\ell_j-\ell_k)}\eta_j^2\big)^{1/2}$,
  $G(t,\eta)=\int_{1/t}^1\sigma^{\ell_k}H(\sigma,\eta)\,d\sigma$.
* **Large parameter:** $\lambda=\mu\,t^{\ell_k+1}|\xi_k|$.
  Phase $\Phi(\eta)=\frac{\xi_k}{|\xi_k|}\frac1t\sum_{j\ne k}x_j\eta_j-G(t,\eta)$.
  Inner integral $J(\xi_k)=\int_{\mathbb R^n}e^{i\lambda\Phi(\eta)}b(\xi_k,\eta)\,d\eta$.
* Amplitude $b(\xi_k,\eta)=(1+|\eta|^2)^{-1/2}\tilde\chi(\xi_k,\eta)\,\rho_k(\cdot)$ as in
  the notes, with $\tilde\chi(\xi_k,\eta)=\chi(\xi_ke_k+\sum_{j\ne k}t^{\ell_k-\ell_j}\xi_k\eta_je_j)$.
* $\kappa_j=2\ell_j-\ell_k+1$. **New:** $\Lambda_j=\mu\,t^{\kappa_j}$
  (the oscillation parameter of direction $j$ at frequency $\mu$).
* Direction $j$ is *good* if $\ell_j\ge\ell_k$, *bad* if $\ell_j<\ell_k$;
  *oscillatory* ($\mathcal O$) if $\kappa_j>0$, *borderline* ($\mathcal Z$) if
  $\kappa_j=0$, *flat* ($\mathcal F$) if $\kappa_j<0$.
  $\theta=\tfrac12\min_{m\ \mathrm{bad}}(\ell_k-\ell_m)$ if a bad direction exists.
* Switch time $\sigma_*(\eta)=\max_{m\ \mathrm{bad}}|\eta_m|^{1/(\ell_k-\ell_m)}$;
  $\Gamma_j(a)=\int_a^1\sigma^{\kappa_j-1}d\sigma$.
* Weights $v_j(\eta)=1$ (good), $v_j(\eta)=|\eta_j|$ (bad).
* **Active set** $\mathcal A$ (directions treated by stationary phase):
  $\mathcal A=\{j:\Lambda_j\ge 1\}$, except that if $\mu<1$ or the switch is
  late, borderline directions are removed from $\mathcal A$. Frozen set: complement of $\mathcal A$ in $\{j\ne k\}$.
  Early switch: $|\xi_k|\ge 4t^{-\theta}$; late: otherwise.
* Curvature scale $L_j=\log t$ if $j\in\mathcal Z$, $\mu\ge1$, early switch; $L_j=1$ otherwise.
* Zoom $\eta_j=(\lambda L_j)^{-1/2}\omega_j$. Strips: $\vartheta\in C_0^\infty(\mathbb R)$,
  $\vartheta=1$ on $[-2,2]$, $0$ outside $[-3,3]$; $\mathcal B$ = bad directions in $\mathcal A$;
  $S\subset\mathcal B$; $A=\mathcal A\setminus S$.
* Frozen width $W_j=\lambda^{1/2}\min\big(2\sqrt d,\ 2t^{\ell_j-\ell_k}/|\xi_k|\big)$;
  for frozen $j$ with $\Lambda_j\le 1$: $W_j\le 2\Lambda_j^{1/2}|\xi_k|^{-1/2}\le 2|\xi_k|^{-1/2}$.
* Constants: $C,c>0$ depend only on $d,\ell_1,\dots,\ell_d$; $C_\alpha$ also on $\alpha$.
  Throughout $t\ge t_0\ge e$.
* LaTeX labels (use exactly): `thm:main`, `thm:besov`, `thm:inner`, `thm:ABZ`,
  `lem:scaling`, `lem:trivial`, `lem:sectors`, `lem:newvars`, `lem:support`,
  `lem:hess`, `lem:Gamma`, `lem:curv`, `lem:ybracket`, `lem:weighted`,
  `lem:zoom`, `lem:zoomcheck`, `lem:outer-elem`, `prop:sector`,
  `eq:dominant`, `eq:support`, `eq:phase-deriv`, `eq:twosided`,
  `eq:Gamma-upper`, `eq:Hderiv`, `eq:K1`.

**Style rules for every prompt:** LaTeX, `article` class, `amsthm`.
Short paragraphs with bold run-in titles ("\paragraph{...}") as in the notes.
Every displayed estimate must say what the constant depends on. Where a step
uses a previous lemma, cite it by label. No new notation without adding it to
the Notation Sheet.

---

## Part 1. Target results (what the whole article proves)

**Theorem A (main, dyadic pieces).** There are $t_0$, $C$ depending only on
$d,\ell$ such that for $t\ge t_0$, $p\in\mathbb Z$, $x\in\mathbb R^d$,

$$
|I_p(t,x)|\ \le\ C\,2^{p(d-1)/2}\;t^{-\gamma}\,(\log t)^{\beta},
\qquad
\gamma=\sum_{j=1}^d\ell_j-\frac{(d-1)(\ell_{\max}-1)}2 ,
$$

with $\beta\in\{0,1\}$ an explicit function of $(\ell_j)$ (see Section 7:
$\beta=1$ only when a sector with $\ell_k=\ell_{\max}$ has no oscillatory
direction, or has all other directions flat). When $\beta=0$ and the dominant sector has
borderline directions, the bound improves by $(\log t)^{-|\mathcal Z|/2}$ on the
early-switch part; record this as a refinement, not in the headline.

*Sanity check (must appear in the article):* isotropic case $\ell_j\equiv\ell$
gives $\gamma=\frac{d-1}2+\frac{(d+1)\ell}{2}$, the known rate for
$u_{tt}-t^{2\ell}\Delta u=0$.

**Theorem B (general form = Besov dispersive estimate).** For $t\ge t_0$,

$$
\Big\|\int_{\mathbb R^d}e^{i(x\cdot\xi-\psi(t,\xi))}|A_t\xi|^{-1}\hat f(\xi)\,d\xi\Big\|_{L^\infty_x}
\ \le\ C\,t^{-\gamma}(\log t)^{\beta}\,\|f\|_{\dot B^{(d-1)/2}_{1,1}} .
$$

This is the honest meaning of "the integral over $\mathbb R^d$": $I(t,\cdot)$
itself is a tempered distribution (the integrand is $\sim|\xi|^{-1}$ at
infinity, not integrable), so the article states the general form as an
operator bound, obtained from Theorem A by summing the dyadic pieces.

**Theorem C (inner estimate, generalizes `thm:main` of the notes).** For
$\lambda\ge 1$, all $x$, all $\xi_k\ne0$:

$$
|J(\xi_k)|\le C\,\lambda^{-n/2}\prod_{j\ \mathrm{frozen}}W_j\ \prod_{j\in\mathcal A\cap\mathcal Z}(\log t)^{-1/2}.
$$

For $\lambda\le 1$: $|J(\xi_k)|\le C$ (trivial).

---

## Part 2. Article skeleton

```
0  Abstract
1  Introduction
   1.1 The integral and where it comes from
   1.2 Main results (Thm A, Thm B)
   1.3 Ideas of the proof (sectors, ratios, zoom, types of directions)
   1.4 Notation and conventions
2  Reduction
   2.1 Homogeneity and dyadic decomposition          [NEW]   lem:scaling
   2.2 Trivial bounds                                  [NEW]   lem:trivial
   2.3 Smooth sectors                                  [notes] lem:sectors, eq:dominant
   2.4 New variables and the sector integral           [notes+mu] lem:newvars
   2.5 Support of the amplitude                        [notes+mu] lem:support, eq:support
   2.6 Types of directions, Lambda_j                   [notes+NEW]
3  The Hessian of the phase                            [notes, verbatim]
   lem:hess (eq:twosided), lem:Gamma (eq:Gamma-upper), lem:curv
4  Higher derivatives of the phase                     [notes, verbatim]
   lem:ybracket (eq:Hderiv), remark on failure, lem:weighted
5  Stationary phase at the zoom scale                  [notes+mu]
   thm:ABZ, 5.2 why unit scale fails, lem:zoom, lem:zoomcheck
6  The inner estimate                                  [notes+mu]   thm:inner
7  The outer integral and proof of Theorem A           [NEW]
   lem:outer-elem, prop:sector, proof of thm:main, dominant sector, value of beta
8  The general form: proof of Theorem B                [NEW]   thm:besov
9  Remarks: sharpness, very high frequencies and flat directions, late-switch
   borderline directions                                [NEW, partly open]
Appendix A  The partition of unity on the sphere
Appendix B  Elementary integrals Gamma_j and the ABZ theorem (statement)
```

---

## Part 3. Prompts for Section 1 (Introduction)

### PROMPT 1.1 — Origin of the integral
> Write subsection 1.1 (about 25 lines of LaTeX). Explain: $|A_t\xi|$ is the
> symbol of $\big(-\sum_j t^{2\ell_j}\partial_j^2\big)^{1/2}$, so
> $e^{\pm i\psi(t,\xi)}$ are the WKB phases of the wave equation
> $u_{tt}-\sum_j t^{2\ell_j}\partial_{x_j}^2u=0$ for $t\ge1$, and
> $|A_t\xi|^{-1}e^{-i\psi}$ is the leading symbol of the "sine" propagator
> $\sin(\cdot)/|A_t D|$. State that $I(t,x)$ is its kernel, that a sup-in-$x$
> bound of $I$ is a dispersive estimate, and that the anisotropy
> ($\ell_j$ distinct) is the point of the paper. Mention the isotropic model
> $u_{tt}-t^{2\ell}\Delta u=0$ as the known case (do not invent references;
> leave `\cite{}` placeholders with a comment `% add refs: Tricomi-type /
> Euler--Poisson--Darboux dispersive estimates`). Do not state theorems here.

### PROMPT 1.2 — Main results
> Write subsection 1.2. State Theorem A (`thm:main`) and Theorem B
> (`thm:besov`) exactly as in Part 1 of the plan, with $\gamma$ and $\beta$
> defined. After each theorem, one short paragraph: (a) why the rate
> $2^{p(d-1)/2}$: the phase is homogeneous of degree one, so its Hessian has
> rank $d-1$ on the annulus; (b) the isotropic sanity check; (c) explain that
> $I(t,\cdot)$ is not a function, so Theorem B is the right form of the
> integral over $\mathbb R^d$; (d) one sentence on where $\log t$ comes from
> (borderline directions, $\kappa_j=0$). Do not prove anything.

### PROMPT 1.3 — Ideas of the proof
> Write subsection 1.3 by rewriting the notes' subsection "The difficulty and
> the plan" for the general form. Four moves: (1) homogeneity reduces each
> dyadic piece to the annulus with a prefactor $\mu^{d-1}$ and a factor $\mu$
> in the phase; (2) sectors by the largest weight $t^{\ell_j}|\xi_j|$ and ratio
> coordinates, giving an outer $\xi_k$ integral of an inner $\eta$ integral
> with large parameter $\lambda=\mu t^{\ell_k+1}|\xi_k|$; (3) stationary phase
> at the zoom scale $(\lambda L_j)^{-1/2}$, after classifying directions by
> $\Lambda_j=\mu t^{\kappa_j}$; (4) trivial integration in the frozen
> directions and in $\xi_k$. End with the one-table summary from the notes
> (unit scale vs zoom scale). Keep it under 60 lines.

### PROMPT 1.4 — Notation
> Produce subsection 1.4 from the Notation Sheet (Part 0): a compact list,
> no proofs. Include the sentence: "In all estimates $t\ge t_0\ge e$; the
> index $k$ is fixed; $i,j,m\ne k$."

---

## Part 4. Prompts for Section 2 (Reduction)

### PROMPT 2.1 — Homogeneity and dyadic decomposition (`lem:scaling`) [NEW]
> Prove: for $\mu=2^p$, $I_p(t,x)=\mu^{d-1}I^{\mu}(t,x)$ with
> $I^{\mu}(t,x)=\int e^{i\mu(x\cdot\zeta-\psi(t,\zeta))}|A_t\zeta|^{-1}\chi(\zeta)d\zeta$.
> Proof: substitute $\xi=\mu\zeta$; use $\psi(t,\mu\zeta)=\mu\psi(t,\zeta)$
> (from $|A_s(\mu\zeta)|=\mu|A_s\zeta|$) and $|A_t(\mu\zeta)|^{-1}=\mu^{-1}|A_t\zeta|^{-1}$;
> $d\xi=\mu^d d\zeta$. Then add a remark: since the bound sought is uniform in
> $x$, the variable $x$ may be replaced by any bijection of $\mathbb R^d$,
> in particular by $A_tx$ (used in 2.4). Also add the remark that
> $I=\sum_pI_p$ holds in $\mathcal S'$ and that the article never uses it
> pointwise. Output: a lemma with proof and two remarks, 20 lines.

### PROMPT 2.2 — Trivial bounds (`lem:trivial`) [NEW]
> Prove two bounds. (i) $|I^{\mu}(t,x)|\le C\,t^{-\ell_{\min}}$ for all
> $\mu>0$, $t\ge1$, $x$: use $|A_t\zeta|\ge t^{\ell_{\min}}|\zeta|\ge t^{\ell_{\min}}/2$
> on the support of $\chi$ and the volume of the annulus. (ii) For the inner
> integral of 2.4: $|J(\xi_k)|\le C$ uniformly in $\mu,t,x,\xi_k$, because
> $|b|\le 1$ and $b(\xi_k,\cdot)$ is supported in $|\eta|\le 2\sqrt d$
> (cite `lem:support`). State explicitly that (ii) is used when $\lambda\le1$.
> Output: lemma + proof, 15 lines.

### PROMPT 2.3 — Smooth sectors (`lem:sectors`) [notes]
> Transcribe the notes' subsection "Smooth sectors" as a lemma: existence of
> $\rho_1,\dots,\rho_d$ (defer construction to Appendix A), the decomposition
> $I^{\mu}=\sum_kI^{\mu}_k$ where $I^\mu_k$ carries the factor
> $\rho_k(A_t\zeta/|A_t\zeta|)$, and inequality `eq:dominant`:
> $t^{\ell_k}|\zeta_k|\ge|A_t\zeta|/(2\sqrt d)$ on the support. Note that the
> factor $\mu$ in the phase plays no role here. 15 lines.

### PROMPT 2.4 — New variables and the sector integral (`lem:newvars`) [notes + mu]
> Rewrite the notes' subsections "New variables", "The integrand in the new
> variables", "The sector integral" with the extra factor $\mu$ in the phase.
> Required outputs, each displayed and checked line by line:
> $|A_t\xi|=t^{\ell_k}|\xi_k|(1+|\eta|^2)^{1/2}$;
> $\psi(t,\xi)=t^{\ell_k+1}|\xi_k|G(t,\eta)$ via $s=\sigma t$;
> linear term after $x\mapsto A_tx$:
> $\mu A_tx\cdot\xi=\mu x_kt^{\ell_k}\xi_k+\mu t^{\ell_k}\xi_k\sum_{j\ne k}x_j\eta_j$;
> measure $d\xi=t^{d\ell_k-\sum_j\ell_j}|\xi_k|^nd\xi_kd\eta$; and finally
> $$I^\mu_k=t^{d\ell_k-\sum_j\ell_j-\ell_k}\int_{\mathbb R}e^{i\mu x_kt^{\ell_k}\xi_k}|\xi_k|^{d-2}J(\xi_k)\,d\xi_k,\quad
> J(\xi_k)=\int_{\mathbb R^n}e^{i\lambda\Phi(\eta)}b(\xi_k,\eta)\,d\eta,$$
> with $\lambda=\mu t^{\ell_k+1}|\xi_k|$ and $\Phi$, $b$ as in the Notation
> Sheet. Verify explicitly that $\lambda\Phi$ reproduces the linear term (the
> factor $\mu$ must sit in $\lambda$ only). Include `eq:phase-deriv`:
> $\partial^\alpha_\eta\Phi=-\partial^\alpha_\eta G$ for $|\alpha|\ge2$, and
> the sentence that every bound on derivatives of order $\ge2$ is uniform in
> $x$ and in $\mu$ (since $G$ does not depend on $\mu$). 50 lines.

### PROMPT 2.5 — Support of the amplitude (`lem:support`) [notes + mu]
> Prove, on the support of $b(\xi_k,\cdot)$: $|\eta|\le2\sqrt d$;
> $|\xi_k|\le2$; `eq:support` $|\eta_m|\le 2t^{\ell_m-\ell_k}/|\xi_k|$;
> $|\xi_k|\ge t^{\ell_{\min}-\ell_k}/(4\sqrt d)$; hence
> $\lambda\ge c\,\mu\,t^{1+\ell_{\min}}$. Follow the notes' proof. Then add the
> remark that a derivative $\partial_{\eta_j}$ on $\tilde\chi$ produces the
> factor $t^{\ell_k-\ell_j}\xi_k$, and compute once and for all that at the
> scale $(\lambda L_j)^{-1/2}$ this factor becomes
> $(\lambda L_j)^{-1/2}t^{\ell_k-\ell_j}|\xi_k|=(\Lambda_jL_j)^{-1/2}|\xi_k|^{1/2}\le\sqrt2\,(\Lambda_jL_j)^{-1/2}$.
> (Show the algebra: $t^{-(\ell_k+1)/2}t^{\ell_k-\ell_j}=t^{-\kappa_j/2}$.)
> This identity is the reason for the definition of $\Lambda_j$. 30 lines.

### PROMPT 2.6 — Types of directions and the sets A, B [notes + NEW]
> Write subsection 2.6. Define good/bad, $\mathcal O,\mathcal Z,\mathcal F$,
> $\theta$ as in the notes, then the new quantity $\Lambda_j=\mu t^{\kappa_j}$
> and the active set $\mathcal A$ of the Notation Sheet. Prove these facts:
> (a) every good direction is oscillatory, and if $\lambda\ge2$ then every
> good direction has $\Lambda_j\ge\lambda/2\ge1$ (use $|\xi_k|\le2$ and
> $\ell_j\ge\ell_k$), so good directions are always active when $\lambda\ge2$;
> (b) if $\mu\ge1$ then $\mathcal A\supset\mathcal O$, and $\mathcal A$ can
> contain flat directions only when $\mu\ge t^{-\kappa_j}$; in this article
> such flat directions are **not** activated (state: "we restrict
> $\mathcal A\subset\mathcal O\cup\mathcal Z$; see Section 9 for why
> activating flat directions needs more work"); (c) if $\mu<1$ then
> $\mathcal A\subset\mathcal O$ and $\Lambda_j\ge1$ forces $\kappa_j>0$.
> Define early/late switch and $L_j$. Give the three-line intuition from the
> notes ("oscillatory directions gain from oscillation, flat directions from
> small support, borderline from oscillation with $(\log t)^{-1/2}$").
> Final definition to display: $\mathcal A=\{j\in\mathcal O:\Lambda_j\ge1\}\cup\{j\in\mathcal Z:\mu\ge1,\ \text{early switch}\}$. 35 lines.

---

## Part 5. Prompts for Sections 3–4 (Hessian, higher derivatives) [notes, verbatim]

These sections do not see $\mu$ or $x$. Hand Opus the corresponding part of
the notes and ask for a clean transcription with the checks below.

### PROMPT 3.1 — Hessian quadratic form (`lem:hess`, `eq:twosided`)
> Transcribe "The quadratic form" and "Strict concavity" from Section 3 of
> the notes as Lemma `lem:hess`: for all $q$,
> $\sum_jq_j^2\int_{1/t}^1\sigma^{\kappa_j-1}H^{-3}d\sigma\le-\langle\nabla^2_\eta\Phi q,q\rangle\le\sum_jq_j^2\int_{1/t}^1\sigma^{\kappa_j-1}H^{-1}d\sigma$.
> Checks to include explicitly: $\nabla_\eta H=H^{-1}D\eta$;
> $\nabla^2_\eta H=H^{-3}(H^2D-(D\eta)(D\eta)^T)$; with $z=D^{1/2}\eta$,
> $|z|^2=H^2-1$; and $\sigma^{\ell_k}|D^{1/2}q|^2=\sum_j\sigma^{\kappa_j-1}q_j^2$
> (show: $\ell_k+2(\ell_j-\ell_k)=\kappa_j-1$). Conclude strict concavity of
> $\Phi$ in $\eta$ for every $t,x,\xi_k,\mu$. 35 lines.

### PROMPT 3.2 — Upper bounds for Gamma (`lem:Gamma`, `eq:Gamma-upper`)
> Define $\Gamma_j(a)=\int_a^1\sigma^{\kappa_j-1}d\sigma$ and prove:
> $\Gamma_j(1/t)\le1/\kappa_j$ ($j\in\mathcal O$), $\Gamma_j(1/t)=\log t$
> ($j\in\mathcal Z$), $\Gamma_j(1/t)\le t^{-\kappa_j}/|\kappa_j|$
> ($j\in\mathcal F$). Deduce $-\nabla^2_\eta\Phi\le\operatorname{diag}(\Gamma_j(1/t))$
> from `lem:hess` and $H\ge1$. Include the "where the curvature comes from"
> paragraph (dyadic time scales). 20 lines.

### PROMPT 3.3 — Curvature lemma (`lem:curv`)
> Transcribe Lemma "Curvature" and its proof from the notes verbatim,
> including the definition of the switch time $\sigma_*$ and
> $\sigma_0=\max(1/t,\min(\sigma_*,1/2))$. Add after the proof the remark on
> how $\log t$ enters (part (ii)) and the sentence that for flat directions
> $\Gamma_j(\sigma_0)$ is large but is not used. Check: in the proof, the bad
> contribution for $\sigma\ge1/2$ is $\le 4^{\ell_k-\ell_m}R^2$ because
> $\sigma^{2(\ell_m-\ell_k)}\le 2^{2(\ell_k-\ell_m)}$. 35 lines.

### PROMPT 4.1 — Derivatives of the bracket (`lem:ybracket`, `eq:Hderiv`)
> Transcribe "A direct bound" from Section 4 of the notes: the structure
> lemma for $\partial_y^\alpha\langle y\rangle$ (linear combination of
> $y^\beta\langle y\rangle^{1-2m}$, $2m-|\beta|=|\alpha|$), the bound
> $|\partial^\alpha_\eta H|\le C_\alpha\mu^\alpha H^{1-|\alpha|}$ with
> $\mu_m=\sigma^{\ell_m-\ell_k}$ — **rename** $\mu_m$ to $\nu_m$ everywhere
> to avoid the clash with the frequency scale $\mu$ — and the direct bound
> $|\partial^\alpha_\eta G|\le C_\alpha\int_{1/t}^1\sigma^{\ell_k+\sum_m\alpha_m(\ell_m-\ell_k)}d\sigma$.
> 35 lines.

### PROMPT 4.2 — Why the direct bound fails; the weights
> Transcribe "Bad directions and weights": the computation of
> $\partial^{2N}_{\eta_j}G(t,0)$, why it diverges for bad $j$, and the
> definition of $v_j$. Keep the explanation via the switch time. 20 lines.

### PROMPT 4.3 — Weighted derivatives (`lem:weighted`)
> Transcribe Lemma "Weighted derivatives" and its proof with $\nu_m$ in place
> of $\mu_m$. Add one sentence after the statement: the lemma holds for every
> $\eta\in\mathbb R^n$ and is independent of $\mu$ and $x$. 30 lines.

---

## Part 6. Prompts for Section 5 (stationary phase at the zoom scale) [notes + mu]

### PROMPT 5.1 — The ABZ theorem (`thm:ABZ`)
> State Theorem 3 of Alazard–Burq–Zuily as in the notes ($M_m$, $N_m$,
> $a_0$, $K_1$ with sup distance). Add the two remarks: no volume of $K$
> appears; only derivatives of order $\ge2$ of the phase appear. Add a
> `\cite{ABZ}` placeholder with bibliographic comment "A stationary phase
> theorem with explicit constants" (verify the exact title before submission).
> 20 lines.

### PROMPT 5.2 — Why the unit scale is not enough
> Rewrite the notes' subsection 5.2 with $\mu$: at unit scale $N_d$ can be as
> large as $t^{d(\ell_k-\ell_{\min})}$ independently of $\mu$; $M$ grows in
> bad directions; borderline directions put $\log t$ in $a_0$ and in $M$.
> Then the paragraph on the scale $\lambda^{-1/2}$, strips of width
> $\lambda^{-1/2}$ around $\eta_m=0$. 30 lines.

### PROMPT 5.3 — The zoom (`lem:zoom`)
> State and prove: with $\eta_j=(\lambda L_j)^{-1/2}\omega_j$,
> $J=\lambda^{-n/2}\prod_jL_j^{-1/2}\int e^{i\tilde\Phi}\tilde b\,d\omega$,
> $\tilde\Phi=\lambda\Phi$, and
> $\partial^\alpha_\omega\tilde\Phi=\lambda^{1-|\alpha|/2}\prod_mL_m^{-\alpha_m/2}\partial^\alpha_\eta\Phi$.
> Then the strip decomposition $J=\sum_{S\subset\mathcal B}J_S$ with
> $\tilde b_S$ as in the notes, the active set $A=\mathcal A\setminus S$,
> frozen variables. Note $\lambda$ now contains $\mu$ and that the formulas are
> otherwise unchanged. 30 lines.

### PROMPT 5.4 — Conditions at the zoom scale (`lem:zoomcheck`) — the key lemma
> Prove: for $t\ge t_0$, $\lambda\ge2$, $S\subset\mathcal B$, frozen
> variables fixed, viewing $\tilde\Phi,\tilde b_S$ as functions of
> $\omega_A$: $\nabla_{\omega_A}\tilde\Phi$ injective, $a_0\ge c$,
> $\tilde M_{|A|+2}\le C$, $\tilde N_{|A|+1}\le C$, uniformly in $\mu>0$, $x$,
> $\xi_k$ and the frozen variables.
> Follow the notes' proof (a)–(d) with these modifications:
> * Location of $\tilde K_1$: each active $\eta_j$ moves by
>   $(\lambda L_j)^{-1/2}\le1$, so $|\eta|\le3\sqrt d$. For the second half of
>   `eq:K1` ($|\eta_m|\le 4t^{\ell_m-\ell_k}/|\xi_k|$ for bad $m$) the move is
>   $(\lambda L_m)^{-1/2}=(\Lambda_mL_m)^{-1/2}|\xi_k|^{1/2}\cdot t^{\ell_m-\ell_k}/|\xi_k|\le\sqrt2\,t^{\ell_m-\ell_k}/|\xi_k|$,
>   valid because active $m$ has $\Lambda_m\ge1$. **This is where the general
>   case differs from the notes**: the notes used $\kappa_m\ge0$ and $\mu=1$;
>   now the hypothesis $\Lambda_m\ge1$ replaces it.
> * (a) determinant: as in the notes; the $\log t$ case needs $\mu\ge1$ and
>   the early switch (both are in the definition of $L_j=\log t$).
> * (c) phase derivatives: as in the notes; first factor bounded since
>   $A\subset\mathcal O\cup\mathcal Z$; active bad $m$ has
>   $(\lambda L_m)^{1/2}v_m=|\omega_m|\ge1$ on $\tilde K_1$; good $m$ has
>   $(\lambda L_m)^{1/2}v_m\ge\lambda^{1/2}\ge1$.
> * (d) amplitude derivatives: a derivative on $\tilde\chi$ costs
>   $(\Lambda_jL_j)^{-1/2}|\xi_k|^{1/2}\le\sqrt2$ (cite the computation in
>   `lem:support`); this is where $\Lambda_j\ge1$ is used.
> End with the comparison table (unit scale vs zoom scale). 80 lines.
> Pitfall: never write $\kappa_j\ge0$ as the hypothesis; the hypothesis is
> $j\in\mathcal A$, i.e. $\Lambda_j\ge1$ and (for borderline) $\mu\ge1$, early switch.

---

## Part 7. Prompts for Section 6 (the inner estimate, `thm:inner`) [notes + mu]

**Decision (main brain):** the notes freeze borderline directions after a late
switch. For the general form this loses all $\mu$-decay in those directions
at high frequency. Instead, after a late switch, **activate** borderline
directions with $L_j=1$ and accept a $(\log t)^{|A|/2}$ loss from the ABZ
factor $(1+\tilde M)^{|A|/2}$; Section 7 absorbs this loss with the factor
$t^{-\theta|A|/2}$ coming from the short late-switch interval. So the active
set is now
$$\mathcal A=\{j\in\mathcal O:\Lambda_j\ge\Lambda_0\}\ \cup\ \{j\in\mathcal Z:\ \mu\ge\Lambda_0\},$$
with $L_j=\log t$ for $j\in\mathcal Z$ only when the switch is early.
($\Lambda_0\ge 4$ is an absolute threshold constant; the thresholds
$\lambda\ge\lambda_0$ and $\Lambda_j\ge\Lambda_0$ are fixed once, see Part 8.)
Update Part 0 and PROMPT 2.6 accordingly when you run them.

### PROMPT 6.0 — Late-switch variant of `lem:zoomcheck`
> Add to Lemma `lem:zoomcheck` a part (e): if the switch is late and
> $\mathcal Z\ne\emptyset$, with $L_j=1$ for all $j$ and $\mathcal Z\subset A$
> allowed, the same proof gives $a_0\ge c$ (via `lem:curv`(i)),
> $\tilde N_{|A|+1}\le C$ (the amplitude cost is $(\Lambda_j)^{-1/2}|\xi_k|^{1/2}\le\sqrt2$,
> using $\Lambda_j=\mu\ge\Lambda_0$), and $\tilde M_{|A|+2}\le C\log t$ (the
> first factor in the bound of part (c) is now $(\Gamma_i(1/t)\Gamma_j(1/t))^{1/2}\le\log t$
> by `eq:Gamma-upper`). Injectivity unchanged. 20 lines.

### PROMPT 6.1 — Statement and proof of `thm:inner`
> State: for $t\ge t_0$, all $\mu>0$, $x$, $\xi_k\ne0$:
> (0) if $\lambda\le\lambda_0$: $|J|\le C$ (`lem:trivial`(ii));
> (1) if $\lambda>\lambda_0$ and (no bad direction, or early switch):
> $|J|\le C\lambda^{-n/2}\prod_{j\ \mathrm{frozen}}W_j\prod_{j\in\mathcal A\cap\mathcal Z}(\log t)^{-1/2}$;
> (2) if $\lambda>\lambda_0$ and late switch:
> $|J|\le C(\log t)^{|\mathcal A|/2}\lambda^{-n/2}\prod_{j\ \mathrm{frozen}}W_j$.
> Here frozen $=\{j\ne k\}\setminus\mathcal A$ and $W_j$ as in Part 0.
> Proof = the four steps of the notes' Section 6: zoom and strips
> (`lem:zoom`), ABZ with $\lambda=1$ in the active variables
> (`lem:zoomcheck`, resp. part (e)), trivial integration in frozen
> variables (strip directions cost $6$; frozen $j$ costs $2W_j$ — prove
> $|\omega_j|\le W_j$ from $|\eta_j|\le\min(2\sqrt d,2t^{\ell_j-\ell_k}/|\xi_k|)$),
> sum over $S$ ($2^{|\mathcal B|}\le 2^d$ terms). Then the "Summary"
> paragraph of the notes, rewritten with $\Lambda_j$. Also include the
> identity, displayed and proved, that will be used in Section 7:
> $$\lambda^{-1/2}\,W_j\ \le\ 2\,t^{\ell_j-\ell_k}|\xi_k|^{-1}\quad(j\ \text{frozen}),
> \qquad \lambda^{-1/2}W_j\le 2\sqrt d\quad(\text{always}).$$
> 60 lines. Pitfall: uniformity in $x$ comes from `eq:phase-deriv`; say it.

---

## Part 8. Prompts for Section 7 (outer integral, proof of Theorem A) [NEW]

Fix $\lambda_0=4$ and $\Lambda_0=4$. Define for the sector $k$:
$$F^{(k)}_j(\mu,t)=\begin{cases}\min\big(1,\Lambda_j^{-1/2}\big)&\kappa_j\ge0\\ 1&\kappa_j<0\end{cases},
\qquad A_k(\mu,t)=\{j\ne k:\kappa_j\ge0,\ \Lambda_j\ge\Lambda_0\}.$$

**Theorem A (final form to state in the article).** For $t\ge t_0$, $\mu>0$, $x\in\mathbb R^d$:
$$|I^{\mu}(t,x)|\le C\sum_{k=1}^d t^{-\ell_k}\prod_{j\ne k}F^{(k)}_j(\mu,t)\,\big(1+\mathbf 1[A_k(\mu,t)=\emptyset]\log t\big),$$
and, if $\mu\ge\Lambda_0$ and $\mathcal Z_k\ne\emptyset$, the $k$-th term improves by the factor $(\log t)^{-|\mathcal Z_k|/2}$.
Equivalently $|I_p(t,x)|=\mu^{d-1}|I^\mu(t,x)|$ with $\mu=2^p$.

Replace the Theorem A of Part 1 by this. The clean power law of Part 1 is
now **Corollary A′**: if $\ell_{\max}<2\ell_{\min}+1$ (every direction in
every sector is oscillatory), then for $\mu\ge\Lambda_0$
$|I_p(t,x)|\le C2^{p(d-1)/2}t^{-\gamma}$ with $\gamma=\sum_j\ell_j-(d-1)(\ell_{\max}-1)/2$.
In general, for $\mu\ge\Lambda_0$,
$|I_p|\le C\sum_k 2^{p(d-1+|\mathcal F_k|)/2}\,t^{-\ell_k-\frac12\sum_{j\notin\mathcal F_k}\kappa_j}(\log t)^{-|\mathcal Z_k|/2}$:
each flat direction costs half a derivative. (Section 9 explains why.)

### PROMPT 7.1 — Elementary integrals (`lem:outer-elem`)
> Prove: for $0<a<b\le2$ and $e\ge0$: $\int_a^b\xi^{e-1}d\xi\le b^e/e$ if
> $e>0$ and $=\log(b/a)$ if $e=0$. And the "increasing product" bound: for
> $\tau_1,\dots,\tau_n>0$, $\int_a^b\prod_j\min(\tau_j,\xi)\,\frac{d\xi}{\xi}
> \le\prod_j\min(\tau_j,b)\cdot\big(1+\mathbf 1[\max_j\tau_j<b]\log(b/a)\big)$.
> (Proof: if some $\tau_j\ge b$ the integrand is $\le\xi\cdot\prod_{i\ne j}\min(\tau_i,b)/\xi$;
> otherwise split at $\max\tau_j$.) 15 lines.

### PROMPT 7.2 — The trivial region $\lambda\le\lambda_0$
> Let $\xi_0=\min(2,\lambda_0/(\mu t^{\ell_k+1}))$ and $a=t^{\ell_{\min}-\ell_k}/(4\sqrt d)$.
> Prove that the part of $I^\mu_k$ with $|\xi_k|\le\xi_0$ is bounded by
> $C\,t^{-\ell_k}\prod_{j\ne k}\min(1,\xi_0t^{\ell_k-\ell_j})\,(1+\mathbf 1[\ldots]\log t)$,
> using $|J|\le\prod_j\min(4\sqrt d,4t^{\ell_j-\ell_k}/|\xi_k|)$ (volume of the
> $\eta$-support, `lem:support`) and `lem:outer-elem` with $\tau_j=t^{\ell_j-\ell_k}$.
> Key identity to display: $t^{n\ell_k-\sum_j\ell_j}\prod_{j\ne k}\min(t^{\ell_j-\ell_k},\xi_0)=t^{-\ell_k}\prod_{j\ne k}\min(1,\xi_0t^{\ell_k-\ell_j})$.
> Then prove $\min(1,\xi_0t^{\ell_k-\ell_j})\le C\,F^{(k)}_j$ for every $j$
> (two cases $\mu t^{\ell_k+1}\gtrless\lambda_0/2$; use
> $\kappa_j-2(\ell_j-\ell_k)=\ell_k+1$), and that the log can only occur when
> $A_k=\emptyset$ (all $\tau_j<\xi_0$ forces $\Lambda_j<\lambda_0\le\Lambda_0$).
> 35 lines.

### PROMPT 7.3 — Sector bound (`prop:sector`)
> Prove $|I^\mu_k(t,x)|\le C\,t^{-\ell_k}\prod_{j\ne k}F^{(k)}_j\,(1+\mathbf 1[A_k=\emptyset]\log t)$,
> with the $(\log t)^{-|\mathcal Z_k|/2}$ refinement when $\mu\ge\Lambda_0$, $\mathcal Z_k\neq\emptyset$.
> Route. Write $I^\mu_k=t^{n\ell_k-\sum\ell}\int|\xi_k|^{n-1}|J|\,d\xi_k$ in
> absolute value (the factor $e^{i\mu x_kt^{\ell_k}\xi_k}$ is dropped).
> Split $[a,2]$ into $R_0=\{\lambda\le\lambda_0\}$ (PROMPT 7.2),
> $R_{\mathrm{late}}=\{\lambda>\lambda_0,\ |\xi_k|<4t^{-\theta}\}$,
> $R_{\mathrm{early}}=\{\lambda>\lambda_0,\ |\xi_k|\ge4t^{-\theta}\}$ (no split
> if there is no bad direction). On $R_{\mathrm{early}}$ insert `thm:inner`(1):
> $$t^{n\ell_k-\sum\ell}\,\xi^{n-1}\lambda^{-n/2}\prod_{\mathrm{frozen}}W_j
> \le C\,t^{n\ell_k-\sum\ell}\,(\mu t^{\ell_k+1})^{-|A|/2}\prod_{\mathrm{frozen}}t^{\ell_j-\ell_k}\ \xi^{|A|/2-1},$$
> integrate with `lem:outer-elem` ($e=|A|/2$), and verify the identity
> $$t^{n\ell_k-\sum_j\ell_j}\,(\mu t^{\ell_k+1})^{-|A|/2}\prod_{j\ \mathrm{frozen}}t^{\ell_j-\ell_k}
> \;=\;t^{-\ell_k}\prod_{j\in A}\Lambda_j^{-1/2}$$
> (use $n=|A|+\#\mathrm{frozen}$ and $\ell_k+1-2(\ell_k-\ell_j)=\kappa_j$).
> On $R_{\mathrm{late}}$ insert `thm:inner`(2): same computation with the
> extra $(\log t)^{|A|/2}$ and the integral over $[a,4t^{-\theta}]$, which
> gives $(4t^{-\theta})^{|A|/2}$ when $|A|\ge1$; note $(\log t)^{|A|/2}t^{-\theta|A|/2}\le C$.
> When $A=\emptyset$ the integral gives $\log(2/a)\le C\log t$.
> Finally $\prod_{j\in A}\Lambda_j^{-1/2}=\prod_{j\ne k}F_j$ up to a constant
> (for $j\notin A$ with $\kappa_j\ge0$, $\Lambda_j<\Lambda_0$ so $F_j\ge\Lambda_0^{-1/2}$;
> flat $j$ have $F_j=1$). 70 lines.

### PROMPT 7.4 — Proof of Theorem A and Corollary A′
> Sum `prop:sector` over $k$ ($d$ terms). Then prove Corollary A′: show
> $\ell_{\max}<2\ell_{\min}+1\Rightarrow\kappa^{(k)}_j>0$ for all $j,k$;
> for $\mu\ge\Lambda_0$ then $A_k=\{j\ne k\}$ and
> $t^{-\ell_k}\prod_{j\ne k}\Lambda_j^{-1/2}=\mu^{-n/2}t^{-\sum_j\ell_j+n(\ell_k-1)/2}$;
> maximize over $k$: $\ell_k=\ell_{\max}$. Multiply by $\mu^{d-1}$.
> Isotropic check: $\gamma=\frac{d-1}2+\frac{(d+1)\ell}2$. Also derive the
> general high-frequency bound displayed above Part 8's prompts.
> Add a remark: the dominant sector is the one whose leading coordinate has
> the largest exponent. 35 lines.

---

## Part 9. Prompts for Sections 8–9 and appendices

### PROMPT 8.1 — Theorem B (`thm:besov`), the general form
> Define $T_tf(x)=\int e^{i(x\cdot\xi-\psi(t,\xi))}|A_t\xi|^{-1}\hat f(\xi)\,d\xi$
> for $f\in\mathcal S$ with $\hat f$ vanishing near $0$, and
> $\Delta_pf=\chi(2^{-p}D)f$. Prove
> $\|T_tf\|_{L^\infty}\le\sum_p\sup_x|I_p(t,x)|\,\|\Delta_pf\|_{L^1}$
> (Young, $T_t\Delta_p f=I_p(t,\cdot)*\Delta_p'f$ with a fattened cutoff
> $\chi'$; handle the fattening by replacing $\chi$ by $\chi'$ in Theorem A,
> which changes only constants). Insert Theorem A:
> $$\|T_tf\|_{L^\infty}\le C\sum_{p\in\mathbb Z}m(2^p,t)\,\|\Delta_pf\|_{L^1},\qquad
> m(\mu,t)=\mu^{d-1}\sum_kt^{-\ell_k}\prod_{j\ne k}F^{(k)}_j(\mu,t)\big(1+\mathbf 1[A_k=\emptyset]\log t\big).$$
> Corollary B′ (clean case $\ell_{\max}<2\ell_{\min}+1$):
> $\|T_tf\|_{L^\infty}\le C\,t^{-\gamma}\|f\|_{\dot B^{(d-1)/2}_{1,1}}+C\,t^{-\ell_{\min}}\|f\|_{L^1}$
> (high frequencies $\mu\ge\Lambda_0$ from Corollary A′; low frequencies from
> `lem:trivial`(i): $m(\mu,t)\le C\mu^{d-1}t^{-\ell_{\min}}$, summable).
> Explain in one paragraph that this is the meaning of the integral over
> $\mathbb R^d$: $I(t,\cdot)=\sum_pI_p(t,\cdot)$ in $\mathcal S'$, and the
> sum of the sup-norms diverges, so a pointwise statement is impossible. 45 lines.

### PROMPT 9.1 — Remarks: what is sharp and what is not
> Write Section 9 with four remarks, no proofs beyond heuristics.
> (a) Sharpness of $\lambda^{-n/2}$ in the all-oscillatory case: rank of the
> Hessian of a degree-one homogeneous phase is $d-1$.
> (b) The $(\log t)^{-1/2}$ for borderline directions is sharp after an early
> switch: `lem:curv`(ii) plus `eq:Gamma-upper` show the curvature is exactly
> of order $\log t$.
> (c) Flat directions at very high frequency: when $\mu\ge t^{-\kappa_j}$
> ($\kappa_j<0$) the amplitude is smooth at the zoom scale, but the curvature
> $\Gamma_j(\sigma_*(\eta))\sim\sigma_*(\eta)^{\kappa_j}$ varies with $\eta$
> across the support (through the switch time), so no single $L_j$ works.
> Activating them needs a dyadic decomposition in $\sigma_*(\eta)$, i.e. in
> the sizes $|\eta_m|$ of the bad coordinates, with $L_j$ chosen piece by
> piece; the derivative cost of these cutoffs must be compared with the zoom
> scale. State this as an open refinement; it would remove the factor
> $2^{p|\mathcal F_k|/2}$ in the general high-frequency bound.
> (d) Late-switch borderline directions: compare the two options (freeze as
> in the notes, loss $|\xi_k|^{-1/2}$; activate with $L_j=1$, loss
> $(\log t)^{|A|/2}$ absorbed by $t^{-\theta|A|/2}$) and say why the article
> uses the second. 50 lines.

### PROMPT A.1 — Appendix A: partition of unity on the sphere
> Construct $\rho_1,\dots,\rho_d\in C^\infty(\mathbb S^{d-1})$ with
> $\sum\rho_k=1$ and $\operatorname{supp}\rho_k\subset\{|p_k|\ge1/(2\sqrt d)\}$:
> take $g\in C^\infty(\mathbb R)$, $g=0$ on $[-1/(2\sqrt d),1/(2\sqrt d)]$,
> $g=1$ outside $[-1/\sqrt d,1/\sqrt d]$, $g\ge0$; put $\rho_k=g(p_k)/\sum_mg(p_m)$,
> and show the denominator is $\ge1$ since $\max_m|p_m|\ge1/\sqrt d$ on the sphere.
> Also record $|\partial^\alpha\rho_k|\le C_\alpha$. 15 lines.

### PROMPT A.2 — Appendix B: the ABZ theorem and conventions
> Restate `thm:ABZ` with all definitions ($K$, $K_1$ with sup distance,
> $M_m$, $N_m$, $a_0$) and the remark that it is applied with $\lambda=1$ after
> the zoom, so the whole gain is in the Jacobian. Add the bibliography entry
> placeholder. 15 lines.

---

## Part 10. Work order, dependencies, QA

**Dependency graph**
```
2.1 scaling ──┐
2.3 sectors ──┼─ 2.4 newvars ── 2.5 support ── 2.6 types ──┐
2.2 trivial ──┘                                            │
3.1 hess ── 3.2 Gamma ── 3.3 curv ─────────────┐           │
4.1 ybracket ── 4.2 ── 4.3 weighted ───────────┼─ 5.3 zoom ─ 5.4 zoomcheck (+6.0) ─ 6.1 inner
5.1 ABZ ── 5.2 ────────────────────────────────┘                                   │
7.1 outer-elem ── 7.2 trivial region ── 7.3 sector ── 7.4 Theorem A ───────────────┘
8.1 Theorem B ── 9.1 remarks ── 1.x introduction (write last)
```

**Batches to run in parallel**
1. Batch 1 (pure transcription, no $\mu$): 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.1, A.1, A.2.
2. Batch 2 (adapted): 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 5.2, 5.3.
3. Batch 3 (depends on 1–2): 5.4 + 6.0, then 6.1.
4. Batch 4 (new): 7.1, 7.2, 7.3, 7.4, then 8.1, 9.1.
5. Batch 5: introduction 1.1–1.4, abstract, final notation pass.

**QA checklist for every returned section (run as a separate "verifier" prompt)**
* Every $\mu$ sits inside $\lambda$ or $\Lambda_j$; $G$, $H$, $\Gamma_j$, `lem:curv`, `lem:weighted` contain no $\mu$.
* The dyadic index is $p$, never $j$. The notes' $\mu_m$ is renamed $\nu_m$.
* Hypothesis of `lem:zoomcheck` is $j\in\mathcal A$ ($\Lambda_j\ge\Lambda_0$), never $\kappa_j\ge0$ alone.
* Exponent identities re-derived: $t^{-(\ell_k+1)/2}t^{\ell_k-\ell_j}=t^{-\kappa_j/2}$;
  $\kappa_j-2(\ell_j-\ell_k)=\ell_k+1$; $\ell_k+2(\ell_j-\ell_k)=\kappa_j-1$;
  $t^{n\ell_k-\sum\ell}(\mu t^{\ell_k+1})^{-|A|/2}\prod_{\mathrm{frozen}}t^{\ell_j-\ell_k}=t^{-\ell_k}\prod_{A}\Lambda_j^{-1/2}$.
* Isotropic sanity check reproduces $\gamma=\frac{d-1}2+\frac{(d+1)\ell}2$.
* Each constant's dependence is stated; $t_0\ge e$; $\lambda_0=\Lambda_0=4$.
* Labels match Part 0; no new notation without updating Part 0.

**Changes relative to the notes (summary table for the introduction)**

| Item | Notes (annulus) | Article (general form) |
|---|---|---|
| Frequency | $|\xi|\sim1$ | dyadic $\mu=2^p$, prefactor $\mu^{d-1}$, $\lambda=\mu t^{\ell_k+1}|\xi_k|$ |
| Classification | $\kappa_j\gtrless0$ | $\Lambda_j=\mu t^{\kappa_j}$ vs $\Lambda_0$; flat never active |
| Small $\lambda$ | excluded ($t_0$ large) | trivial region, PROMPT 7.2 |
| Late-switch borderline | frozen, loss $|\xi_k|^{-1/2}$ | active with $L_j=1$, loss $(\log t)^{|A|/2}$ absorbed by $t^{-\theta|A|/2}$ |
| Outer $\xi_k$ integral | not treated | Section 7, $t^{-\ell_k}\prod_jF_j$ |
| Integral over $\mathbb R^d$ | — | Theorem B (Besov), Corollary A′ power law |
