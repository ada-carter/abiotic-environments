function c_b(x, r)
    n = 2000
    p = zeros(n)
    curr = x
    
    for i in 1:n
        curr = r * curr * (1.0 - curr)
        curr += 0.001 * (rand() - 0.5)
        if curr > 1.0 curr = 1.0 end
        if curr < 0.0 curr = 0.0 end
        
        if curr < 0.33
            m = n / 2.0
            s = n / 6.0
            p[i] = exp(-((i - m)^2.0) / (2.0 * s^2.0))
        elseif curr < 0.66
            k = 2.0
            th = n / 10.0
            p[i] = (i^(k-1.0) * exp(-i/th))
        else
            p[i] = abs(sin(i * curr * 0.05) * cos(i * 0.01))
        end
        
        if i > 1
            p[i] = 0.8 * p[i] + 0.2 * p[i-1]
        end
    end
    
    e = 0.0
    for i in 1:n
        if p[i] > 1e-6
            e -= p[i] * log(p[i])
        end
    end
    
    m_p = 0.0
    for i in 1:n
        if p[i] > m_p m_p = p[i] end
    end
    if m_p > 0.0
        for i in 1:n p[i] /= m_p end
    end
    
    return p, curr
end
