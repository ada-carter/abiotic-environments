function g_c(s, d)
    n = Int(s * d)
    b = zeros(n)
    p = 0.0
    f0 = 20.0
    f1 = 20000.0
    h = d / 2.0
    dt = 1.0 / s
    for i in 1:n
        t = (i - 1) * dt
        if t <= h
            k = t / h
            f = f0 * (f1 / f0)^k
        else
            k = (t - h) / h
            f = f1 * (f0 / f1)^k
        end
        v = sin(2.0 * pi * f * t)
        v += 0.5 * sin(4.0 * pi * f * t)
        v += 0.25 * sin(6.0 * pi * f * t)
        mu = exp(-((t - h)^2) / (2 * (h/4)^2))
        p += 2.0 * pi * f * dt
        b[i] = v * mu
    end
    for j in 1:3
        tmp = copy(b)
        for i in 2:n-1
            b[i] = 0.5 * tmp[i] + 0.25 * (tmp[i-1] + tmp[i+1])
        end
    end
    m_x = 0.0
    for i in 1:n
        if abs(b[i]) > m_x
            m_x = abs(b[i])
        end
    end
    for i in 1:n
        b[i] /= m_x
    end
    return b
end
